import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { mediaAssets } from "@/db/schema";

export const MEDIA_URL = "/api/medias";

/** Adresse publique d'une image de la bibliothèque. */
export function mediaUrl(slug: string, version?: number) {
  return version ? `${MEDIA_URL}/${slug}?v=${version}` : `${MEDIA_URL}/${slug}`;
}

export async function listMedia() {
  try {
    return await db
      .select({
        id: mediaAssets.id,
        slug: mediaAssets.slug,
        title: mediaAssets.title,
        usage: mediaAssets.usage,
        mime: mediaAssets.mime,
        width: mediaAssets.width,
        height: mediaAssets.height,
        bytes: mediaAssets.bytes,
        uploadedAt: mediaAssets.uploadedAt,
      })
      .from(mediaAssets)
      .orderBy(asc(mediaAssets.title));
  } catch {
    return [];
  }
}

export async function readMedia(slug: string) {
  const rows = await db
    .select()
    .from(mediaAssets)
    .where(eq(mediaAssets.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

/** Identifiant d'URL : sans accent, sans espace, unique. */
export function toSlug(input: string): string {
  const base = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return base || "image";
}
