import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brandAssets } from "@/db/schema";

export const LOGO_KIND = "logo";
export const LOGO_URL = "/api/marque/logo";

export type BrandLogo = {
  url: string;
  mime: string;
  filename: string;
  sourceFormat: string;
  bytes: number;
  width: number | null;
  height: number | null;
  updatedAt: Date;
  /** Horodatage de cache, pour forcer le rafraîchissement après remplacement. */
  version: number;
};

/** Métadonnées du logo déposé, sans charger les données binaires. */
export async function getBrandLogo(): Promise<BrandLogo | null> {
  try {
    const rows = await db
      .select({
        mime: brandAssets.mime,
        filename: brandAssets.filename,
        sourceFormat: brandAssets.sourceFormat,
        bytes: brandAssets.bytes,
        width: brandAssets.width,
        height: brandAssets.height,
        updatedAt: brandAssets.updatedAt,
      })
      .from(brandAssets)
      .where(eq(brandAssets.kind, LOGO_KIND))
      .limit(1);

    const row = rows[0];
    if (!row) return null;

    const version = row.updatedAt.getTime();
    return { ...row, version, url: `${LOGO_URL}?v=${version}` };
  } catch {
    // Table absente ou base indisponible : on retombe sur la marque dessinée.
    return null;
  }
}

/** Contenu complet, pour la route de diffusion du fichier. */
export async function readBrandLogo() {
  const rows = await db
    .select()
    .from(brandAssets)
    .where(eq(brandAssets.kind, LOGO_KIND))
    .limit(1);
  return rows[0] ?? null;
}
