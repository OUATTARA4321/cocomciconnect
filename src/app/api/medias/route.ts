import { eq } from "drizzle-orm";
import { db } from "@/db";
import { mediaAssets } from "@/db/schema";
import { listMedia, toSlug } from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 15 * 1024 * 1024;
const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "image/avif"];

/** Liste de la bibliothèque. */
export async function GET() {
  const items = await listMedia();
  return Response.json({ ok: true, items });
}

/** Téléversement d'une image. */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const usage = String(form.get("usage") ?? "image");
    const title = String(form.get("title") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      return Response.json({ ok: false, error: "Aucun fichier reçu." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return Response.json(
        { ok: false, error: "Fichier trop lourd (15 Mo maximum)." },
        { status: 413 },
      );
    }
    const looksImage =
      ACCEPTED.includes(file.type) || /\.(png|jpe?g|webp|avif)$/i.test(file.name);
    if (!looksImage) {
      return Response.json(
        { ok: false, error: "Format non pris en charge. Utilisez JPG, PNG ou WebP." },
        { status: 415 },
      );
    }

    const sharp = (await import("sharp")).default;
    const input = Buffer.from(await file.arrayBuffer());

    // Portrait : recadrage 4:5 centré sur le haut du sujet (le visage).
    // Image libre : redimensionnement simple, 1 600 px de large maximum.
    const pipeline =
      usage === "portrait"
        ? sharp(input)
            .rotate()
            .resize(800, 1000, { fit: "cover", position: "attention" })
        : sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true });

    const output = await pipeline.jpeg({ quality: 86, mozjpeg: true }).toBuffer();
    const meta = await sharp(output).metadata();

    const label = title || file.name.replace(/\.[^.]+$/, "");
    let slug = toSlug(label);

    // Unicité du slug.
    const existing = await db
      .select({ slug: mediaAssets.slug })
      .from(mediaAssets)
      .where(eq(mediaAssets.slug, slug))
      .limit(1);
    if (existing.length) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

    await db.insert(mediaAssets).values({
      slug,
      title: label,
      usage,
      mime: "image/jpeg",
      data: output.toString("base64"),
      width: meta.width ?? 0,
      height: meta.height ?? 0,
      bytes: output.length,
      uploadedAt: new Date(),
    });

    return Response.json({
      ok: true,
      slug,
      title: label,
      usage,
      url: `/api/medias/${slug}`,
      width: meta.width,
      height: meta.height,
      bytes: output.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Téléversement impossible.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
