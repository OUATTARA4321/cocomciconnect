export type ConvertedLogo = {
  mime: string;
  /** Source SVG (utf8) ou données base64 (bitmap). */
  data: string;
  encoding: "utf8" | "base64";
  sourceFormat: string;
  width: number | null;
  height: number | null;
  bytes: number;
  note: string;
};

/** Largeur de rastérisation si le PDF ne peut pas être vectorisé. */
const RASTER_WIDTH = 1600;

/**
 * Convertit un PDF en logo exploitable sur le web.
 * Priorité au SVG vectoriel ; repli sur un PNG haute définition.
 */
export async function convertPdfLogo(buffer: Buffer): Promise<ConvertedLogo> {
  const mupdf = await import("mupdf");

  const doc = mupdf.Document.openDocument(buffer, "application/pdf");
  if (doc.countPages() < 1) throw new Error("Le PDF ne contient aucune page.");

  const page = doc.loadPage(0);
  const [x0, y0, x1, y1] = page.getBounds();
  const w = Math.max(1, x1 - x0);
  const h = Math.max(1, y1 - y0);

  // 1) Tentative vectorielle : le tracé reste net à toute taille.
  try {
    const out = new mupdf.Buffer();
    const writer = new mupdf.DocumentWriter(out, "svg", "text=path");
    const device = writer.beginPage([x0, y0, x1, y1]);
    page.run(device, mupdf.Matrix.identity);
    device.close();
    writer.endPage();
    writer.close();

    let svg = out.asString();
    if (svg && svg.includes("<svg")) {
      // viewBox garanti, pour que le logo se redimensionne proprement.
      if (!/viewBox=/.test(svg)) {
        svg = svg.replace(
          /<svg([^>]*)>/,
          `<svg$1 viewBox="0 0 ${w.toFixed(2)} ${h.toFixed(2)}">`,
        );
      }
      return {
        mime: "image/svg+xml",
        data: svg,
        encoding: "utf8",
        sourceFormat: "pdf",
        width: Math.round(w),
        height: Math.round(h),
        bytes: Buffer.byteLength(svg, "utf8"),
        note: "PDF vectorisé en SVG : le logo reste net à toutes les tailles.",
      };
    }
  } catch {
    // On bascule sur la rastérisation.
  }

  // 2) Repli bitmap haute définition, fond transparent conservé.
  const scale = RASTER_WIDTH / w;
  const pixmap = page.toPixmap(
    mupdf.Matrix.scale(scale, scale),
    mupdf.ColorSpace.DeviceRGB,
    true,
    true,
  );
  const png = Buffer.from(pixmap.asPNG());

  return {
    mime: "image/png",
    data: png.toString("base64"),
    encoding: "base64",
    sourceFormat: "pdf",
    width: pixmap.getWidth(),
    height: pixmap.getHeight(),
    bytes: png.length,
    note: `PDF rastérisé en PNG ${pixmap.getWidth()} px (le tracé vectoriel n’a pas pu être extrait).`,
  };
}

/**
 * Prépare une image déposée (PNG, JPG, WebP) :
 *   · détoure les marges unies d'une capture d'écran ;
 *   · rend le fond blanc transparent, pour que le logo tienne sur fond sombre ;
 *   · normalise la largeur à 1 200 px maximum.
 */
export async function prepareBitmapLogo(
  buffer: Buffer,
): Promise<{ png: Buffer; width: number; height: number; trimmed: boolean }> {
  const sharp = (await import("sharp")).default;

  const before = await sharp(buffer).metadata();
  let img = sharp(buffer).ensureAlpha();

  // Détourage des bords unis (marges blanches d'une capture).
  try {
    img = sharp(await img.trim({ threshold: 12 }).toBuffer()).ensureAlpha();
  } catch {
    img = sharp(buffer).ensureAlpha();
  }

  // Blanc proche du blanc → transparent.
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const channels = info.channels;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 242 && g > 242 && b > 242) data[i + 3] = 0;
  }

  let out = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });

  if (info.width > 1200) out = out.resize({ width: 1200 });

  const png = await out.png({ compressionLevel: 9 }).toBuffer();
  const after = await sharp(png).metadata();

  return {
    png,
    width: after.width ?? info.width,
    height: after.height ?? info.height,
    trimmed: (before.width ?? 0) !== info.width || (before.height ?? 0) !== info.height,
  };
}

/** Nettoyage d'un SVG téléversé : retrait des scripts et gestionnaires d'événements. */
export function sanitizeSvg(source: string): string {
  return source
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}
