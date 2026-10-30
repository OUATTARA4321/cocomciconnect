"use client";

import { useBrand } from "@/components/Brand";

/**
 * Logo officiel de la COCOMCI — reconstitution fidèle de la marque fournie.
 *
 * Composition d'origine :
 *   · un anneau orange ouvert au nord-est, terminé par un point ;
 *   · la silhouette verte de la Côte d'Ivoire ;
 *   · un monogramme « C » découpé en négatif dans la masse verte,
 *     barré d'un trait horizontal ;
 *   · le logotype « COCOMCI » en vert.
 *
 * Le fichier original peut être déposé sur /administration/logo (PDF, SVG, PNG) :
 * il remplace alors ce tracé partout sur le portail.
 */

export type LogoTone = "color" | "ink" | "paper";

/** Couleurs relevées sur la marque d'origine. */
export const CI_ORANGE = "#F0871F";
export const CI_GREEN = "#2B7A3F";
const CREAM = "#F3EDE1";
const INK = "#12301F";

/**
 * `carve` est la couleur du fond : c'est elle qui creuse le monogramme
 * dans la masse verte. Elle doit donc suivre le support.
 */
function palette(tone: LogoTone) {
  if (tone === "ink") return { ring: INK, mass: INK, carve: CREAM };
  if (tone === "paper") return { ring: CREAM, mass: CREAM, carve: INK };
  return { ring: CI_ORANGE, mass: CI_GREEN, carve: "#FFFFFF" };
}

/** Silhouette de la Côte d'Ivoire : pointe sud-ouest, renflement ouest, nord droit. */
const IVORY_COAST =
  "M35.5 27.4 L68.4 26.7 L73.3 37.6 L72.1 54.6 L74.6 68.2 L72.7 81.8 " +
  "L63.4 86.6 L51 87.9 L37.4 83.8 L32.4 79.8 L29.3 70.2 L31.8 60.7 " +
  "L25.6 51.2 L28.1 40.3 L33.6 30.8 Z";

/** L'emblème seul. Lisible dès 24 px — contrôlé en rendu. */
export function LogoMark({
  size = 56,
  tone = "color",
  className = "",
  title = "Logo de la COCOMCI",
}: {
  size?: number;
  tone?: LogoTone;
  className?: string;
  title?: string;
}) {
  const { logoUrl } = useBrand();
  const c = palette(tone);

  // Fichier original déposé par la Coordination : il prime sur le tracé.
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={title || "Logo de la COCOMCI"}
        width={size}
        height={size}
        className={`object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Sous 26 px, la silhouette de la carte se comble : on garde la version
  // réduite — anneau, point et monogramme — qui reste identifiable.
  if (size < 26) {
    return (
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className={className}
        role="img"
        aria-label={title}
      >
        <path
          d="M71.9 15.6 A46 46 0 1 0 103.2 75.7"
          fill="none"
          stroke={c.ring}
          strokeWidth="11"
          strokeLinecap="round"
        />
        <circle cx="103.2" cy="75.7" r="8" fill={c.ring} />
        <path
          d="M70 40 A24 24 0 1 0 70 80"
          fill="none"
          stroke={c.mass}
          strokeWidth="15"
        />
        <path d="M48 60 H78" stroke={c.mass} strokeWidth="13" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {/* Anneau orange ouvert au nord-est */}
      <path
        d="M71.9 15.6 A46 46 0 1 0 103.2 75.7"
        fill="none"
        stroke={c.ring}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="103.2" cy="75.7" r="6.8" fill={c.ring} />

      {/* Masse verte : la carte de la Côte d'Ivoire */}
      <path d={IVORY_COAST} fill={c.mass} />

      {/* Contre-forme du monogramme, creusée dans la masse */}
      <path
        d="M60.5 72 A18 18 0 1 0 60.5 42"
        fill="none"
        stroke={c.carve}
        strokeWidth="7.5"
      />

      {/* Barreau horizontal : réserve de fond, puis trait plein */}
      <path d="M46 57 H74" stroke={c.carve} strokeWidth="17" strokeLinecap="round" />
      <path d="M49.5 57 H71" stroke={c.mass} strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

/** Bloc-marque complet : emblème + logotype « COCOMCI ». */
export function Logo({
  size = 56,
  tone = "color",
  layout = "horizontal",
  tagline = "Coordination des Opérateurs de Commerce de Côte d’Ivoire",
  className = "",
}: {
  size?: number;
  tone?: LogoTone;
  layout?: "horizontal" | "stacked";
  tagline?: string | null;
  className?: string;
}) {
  const onDark = tone === "paper";
  const stacked = layout === "stacked";
  const wordColor = tone === "color" ? CI_GREEN : tone === "paper" ? CREAM : INK;

  return (
    <span
      className={`flex ${stacked ? "flex-col items-center text-center" : "items-center"} gap-${stacked ? "3" : "4"} ${className}`}
    >
      <LogoMark size={size} tone={tone} className="shrink-0" />

      <span className={stacked ? "" : "min-w-0"}>
        <span
          className="block font-sans font-bold tracking-[-0.012em]"
          style={{ fontSize: size * 0.58, lineHeight: 0.92, color: wordColor }}
        >
          COCOMCI
        </span>

        {tagline && (
          <span
            className={`mt-2 block leading-tight ${onDark ? "text-paper-2/70" : "text-mute"}`}
            style={{ fontSize: Math.max(10, size * 0.145), maxWidth: size * 5 }}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
