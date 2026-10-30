import { LogoMark } from "@/components/Logo";

/**
 * Sceau et badge officiels de la COCOMCI — dessinés en SVG (path data écrit à la main).
 * Lisibles à 16 px, fonctionnels en aplat monochrome.
 */

type SealProps = {
  id?: string;
  size?: number;
  className?: string;
  /** Couleur unique du trait (fonctionne en aplat monochrome). */
  tone?: string;
  /** Masque le texte circulaire (usage très petite taille). */
  compact?: boolean;
};

export function Seal({
  id = "seal",
  size = 120,
  className = "",
  tone = "currentColor",
  compact = false,
}: SealProps) {
  const arcTop = `${id}-arc-top`;
  const arcBottom = `${id}-arc-bottom`;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Sceau de la Coordination des Opérateurs de Commerce de Côte d'Ivoire"
    >
      <defs>
        <path id={arcTop} d="M 22 100 A 78 78 0 0 1 178 100" fill="none" />
        <path id={arcBottom} d="M 30 100 A 70 70 0 0 0 170 100" fill="none" />
      </defs>

      <g stroke={tone} fill="none">
        {/* Anneaux concentriques */}
        <circle cx="100" cy="100" r="97" strokeWidth="2" />
        <circle
          cx="100"
          cy="100"
          r="88"
          strokeWidth="7"
          strokeDasharray="1.6 8.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="100" cy="100" r="71" strokeWidth="2.4" />
        <circle cx="100" cy="100" r="65" strokeWidth="0.9" opacity="0.7" />

        {/* Monogramme « C » de Commerce */}
        <path
          d="M 128.3 71.7 A 40 40 0 1 0 128.3 128.3"
          strokeWidth="12.5"
          strokeLinecap="round"
        />

        {/* Balance du commerce */}
        <path d="M 80 94 H 120" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M 100 86 V 119" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M 90 121 H 110" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M 73 97 Q 80 111 87 97" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M 113 97 Q 120 111 127 97" strokeWidth="3.2" strokeLinecap="round" />

        {/* Losanges de séparation du bandeau */}
        <path d="M 24 100 L 30 94 L 36 100 L 30 106 Z" strokeWidth="1.6" />
        <path d="M 164 100 L 170 94 L 176 100 L 170 106 Z" strokeWidth="1.6" />
      </g>

      {!compact && (
        <g fill={tone} fontFamily="var(--font-sans), sans-serif" fontWeight={700}>
          <text fontSize="11.4" letterSpacing="1.5">
            <textPath href={`#${arcTop}`} startOffset="50%" textAnchor="middle">
              COORDINATION DES OPÉRATEURS DE COMMERCE
            </textPath>
          </text>
          <text fontSize="10.6" letterSpacing="2.4">
            <textPath href={`#${arcBottom}`} startOffset="50%" textAnchor="middle">
              CÔTE D&apos;IVOIRE · COCOMCI
            </textPath>
          </text>
        </g>
      )}
    </svg>
  );
}

/** Marque COCOMCI compacte : le « C » seul, pour favicons et petites tailles. */
export function Monogram({
  size = 28,
  tone = "currentColor",
  className = "",
}: {
  size?: number;
  tone?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <g stroke={tone} fill="none">
        <path
          d="M 128.3 71.7 A 40 40 0 1 0 128.3 128.3"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path d="M 78 92 H 122" strokeWidth="9" strokeLinecap="round" />
        <path d="M 100 84 V 122" strokeWidth="9" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Badge officiel COCOMCI : sceau + plaque d'identification + numéro d'agrément.
 */
/** Initiales d'une personne, pour le cartouche sans photo déposée. */
function initials(name: string): string {
  return name
    .replace(/[^\p{L}\s-]/gu, " ")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Photo d'identité réglementaire : tirage 4:5, bord d'encre, cachet d'angle. */
export function IdPhoto({
  id,
  src,
  name,
  width = 78,
}: {
  id: string;
  src?: string | null;
  name: string;
  width?: number;
}) {
  return (
    <div
      className="idphoto relative shrink-0 border border-ink/30"
      style={{ width, height: Math.round((width * 5) / 4) }}
    >
      {src ? (
        <img
          src={src}
          alt={`Portrait de ${name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[50%_22%]"
        />
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-paper-3">
          <span className="absolute inset-0 flex items-center justify-center opacity-[0.16]">
            <Seal id={`ph-${id}`} size={Math.round(width * 0.92)} tone="#12301f" compact />
          </span>
          <span className="relative font-display text-[1.45rem] leading-none font-semibold text-ink/70">
            {initials(name)}
          </span>
          <span className="relative mt-1 px-1 text-center text-[0.44rem] leading-tight font-semibold tracking-[0.1em] text-ink/45 uppercase">
            Photo
            <br />
            non déposée
          </span>
        </div>
      )}
      {/* Cachet d'angle, comme sur une pièce officielle */}
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-0 z-10 h-0 w-0 border-t-[12px] border-l-[12px] border-t-transparent border-l-stamp/80"
      />
    </div>
  );
}

export function OfficialBadge({
  id,
  badgeNumber,
  name,
  title,
  region,
  city,
  status = "En règle",
  photo,
}: {
  id: string;
  badgeNumber: string;
  name: string;
  title: string;
  region: string;
  city: string;
  status?: string;
  photo?: string | null;
  /** @deprecated conservé pour compatibilité d'appel */
  compact?: boolean;
}) {
  const bars = [3, 1, 2, 1, 1, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 1, 2, 1, 1, 3, 2, 1, 4, 1, 1, 2, 3, 1];
  return (
    <div className="badge-card relative border border-ink/25 bg-paper-2 shadow-[0_1px_0_rgba(18,48,31,0.12)]">
      <div className="flex items-center justify-between gap-2 bg-ink px-3 py-1.5">
        <span className="flex items-center gap-2">
          <LogoMark size={16} tone="paper" title="" />
          <span className="label text-paper-2/90">Badge officiel COCOMCI</span>
        </span>
        <span className="label num text-stamp-soft">{badgeNumber.slice(0, 10)}</span>
      </div>

      <div className="relative flex items-start gap-3 px-3 pt-3">
        <IdPhoto id={id} src={photo} name={name} />

        <div className="relative min-w-0 flex-1">
          {/* Sceau en filigrane, sous le bloc d'identité */}
          <span className="pointer-events-none absolute -top-1 -right-1 opacity-[0.09]">
            <Seal id={`badge-${id}`} size={86} tone="#12301f" compact />
          </span>
          <p className="relative font-display text-[1.06rem] leading-tight font-semibold text-ink">
            {name}
          </p>
          <p className="relative mt-0.5 text-[0.78rem] leading-snug text-mute">{title}</p>
          <p className="label relative mt-2 text-ink/70">{region}</p>
          <p className="relative text-[0.78rem] leading-snug text-ink/55">{city}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-ink/15 px-3 pt-2 pb-2.5">
        <div>
          <p className="label text-mute/80">N° d&apos;agrément</p>
          <p className="num text-[0.82rem] font-semibold tracking-wide text-ink">{badgeNumber}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="inline-flex items-center gap-1 border border-valid/50 bg-valid/10 px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] text-valid uppercase">
            {status}
          </span>
          <svg width="72" height="16" viewBox="0 0 72 16" aria-hidden="true">
            {bars.map((w, i) => {
              const x = bars.slice(0, i).reduce((a, b) => a + b + 1, 0);
              return <rect key={i} x={x} y="0" width={w} height="16" fill="#12301f" opacity={0.72} />;
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
