import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brandAssets } from "@/db/schema";
import { LOGO_KIND, readBrandLogo } from "@/lib/brand";
import {
  convertPdfLogo,
  prepareBitmapLogo,
  sanitizeSvg,
  type ConvertedLogo,
} from "@/lib/pdf-logo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 12 * 1024 * 1024;

const ACCEPTED: Record<string, string> = {
  "application/pdf": "pdf",
  "image/svg+xml": "svg",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

function formatFromName(name: string): string | null {
  const ext = name.toLowerCase().split(".").pop() ?? "";
  if (ext === "pdf") return "pdf";
  if (ext === "svg") return "svg";
  if (ext === "png") return "png";
  if (ext === "jpg" || ext === "jpeg") return "jpg";
  if (ext === "webp") return "webp";
  return null;
}

/** Diffusion du logo déposé. */
export async function GET() {
  const row = await readBrandLogo();
  if (!row) {
    return Response.json({ ok: false, error: "Aucun logo déposé." }, { status: 404 });
  }

  const body =
    row.encoding === "base64"
      ? Buffer.from(row.data, "base64")
      : Buffer.from(row.data, "utf8");

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": row.mime,
      "Content-Length": String(body.length),
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
      "Content-Disposition": `inline; filename="${row.filename.replace(/"/g, "")}"`,
    },
  });
}

/** Dépôt d'un logo : PDF, SVG, PNG, JPG ou WebP. */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { ok: false, error: "Aucun fichier reçu. Sélectionnez le logo à déposer." },
        { status: 400 },
      );
    }
    if (file.size === 0) {
      return Response.json({ ok: false, error: "Le fichier est vide." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return Response.json(
        { ok: false, error: "Fichier trop volumineux (12 Mo maximum)." },
        { status: 413 },
      );
    }

    const format = ACCEPTED[file.type] ?? formatFromName(file.name);
    if (!format) {
      return Response.json(
        {
          ok: false,
          error: "Format non pris en charge. Déposez un PDF, SVG, PNG, JPG ou WebP.",
        },
        { status: 415 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let converted: ConvertedLogo;

    if (format === "pdf") {
      converted = await convertPdfLogo(buffer);
    } else if (format === "svg") {
      const svg = sanitizeSvg(buffer.toString("utf8"));
      if (!svg.includes("<svg")) {
        return Response.json(
          { ok: false, error: "Ce fichier SVG est illisible." },
          { status: 422 },
        );
      }
      converted = {
        mime: "image/svg+xml",
        data: svg,
        encoding: "utf8",
        sourceFormat: "svg",
        width: null,
        height: null,
        bytes: Buffer.byteLength(svg, "utf8"),
        note: "SVG déposé tel quel : qualité vectorielle conservée.",
      };
    } else {
      const prepared = await prepareBitmapLogo(buffer);
      converted = {
        mime: "image/png",
        data: prepared.png.toString("base64"),
        encoding: "base64",
        sourceFormat: format,
        width: prepared.width,
        height: prepared.height,
        bytes: prepared.png.length,
        note: prepared.trimmed
          ? `Image détourée de ses marges et fond blanc rendu transparent (${prepared.width} × ${prepared.height} px).`
          : `Fond blanc rendu transparent (${prepared.width} × ${prepared.height} px). Un PDF ou un SVG donnerait un tracé plus net.`,
      };
    }

    const now = new Date();
    await db
      .insert(brandAssets)
      .values({
        kind: LOGO_KIND,
        filename: file.name || `logo.${converted.sourceFormat}`,
        mime: converted.mime,
        data: converted.data,
        encoding: converted.encoding,
        sourceFormat: converted.sourceFormat,
        width: converted.width,
        height: converted.height,
        bytes: converted.bytes,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: brandAssets.kind,
        set: {
          filename: file.name || `logo.${converted.sourceFormat}`,
          mime: converted.mime,
          data: converted.data,
          encoding: converted.encoding,
          sourceFormat: converted.sourceFormat,
          width: converted.width,
          height: converted.height,
          bytes: converted.bytes,
          updatedAt: now,
        },
      });

    return Response.json({
      ok: true,
      note: converted.note,
      mime: converted.mime,
      bytes: converted.bytes,
      width: converted.width,
      height: converted.height,
      version: now.getTime(),
      url: `/api/marque/logo?v=${now.getTime()}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion impossible.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}

/** Retour à la marque dessinée. */
export async function DELETE() {
  await db.delete(brandAssets).where(eq(brandAssets.kind, LOGO_KIND));
  return Response.json({ ok: true });
}
