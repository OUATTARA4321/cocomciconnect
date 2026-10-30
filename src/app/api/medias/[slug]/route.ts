import { eq } from "drizzle-orm";
import { db } from "@/db";
import { mediaAssets } from "@/db/schema";
import { readMedia } from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diffusion d'une image de la bibliothèque. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const row = await readMedia(slug);
  if (!row) return new Response("Image introuvable.", { status: 404 });

  const body = Buffer.from(row.data, "base64");
  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": row.mime,
      "Content-Length": String(body.length),
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

/** Retrait d'une image. */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  await db.delete(mediaAssets).where(eq(mediaAssets.slug, slug));
  return Response.json({ ok: true });
}
