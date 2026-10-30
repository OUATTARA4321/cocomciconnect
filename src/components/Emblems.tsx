/**
 * Emblèmes de filière — dessinés au trait, dans la même main que le sceau COCOMCI.
 * Lisibles à 20 px, monochromes, sans dépendance externe.
 */

type EmblemProps = { size?: number; tone?: string; className?: string };

const common = (tone: string) => ({
  stroke: tone,
  fill: "none" as const,
  strokeWidth: 4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

function Frame({
  size,
  children,
  label,
}: {
  size: number;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** Quincaillerie — clé plate et boulon. */
export function EmblemQuincaillerie({ size = 44, tone = "currentColor" }: EmblemProps) {
  const s = common(tone);
  return (
    <Frame size={size} label="Quincaillerie">
      <g {...s}>
        <path d="M40 10a11 11 0 0 0-10.4 14.6L12 42.2a5.4 5.4 0 0 0 7.6 7.6l17.6-17.6A11 11 0 1 0 40 10Z" />
        <path d="M44.5 36.5 54 46" />
        <path d="m16 46 2 2" />
      </g>
      <g {...s} strokeWidth={3.2}>
        <path d="m48 40 8 8-4 4-8-8" />
      </g>
    </Frame>
  );
}

/** Textile & habillement — pièce de pagne et aiguille. */
export function EmblemTextile({ size = 44, tone = "currentColor" }: EmblemProps) {
  const s = common(tone);
  return (
    <Frame size={size} label="Textile et habillement">
      <g {...s}>
        <path d="M10 18c6-5 12-5 18 0s12 5 18 0v12c-6 5-12 5-18 0s-12-5-18 0Z" />
        <path d="M10 34c6-5 12-5 18 0s12 5 18 0" />
        <path d="M10 44c6-5 12-5 18 0s12 5 18 0" />
        <path d="M50 12v10" />
        <circle cx="50" cy="9" r="3" />
      </g>
    </Frame>
  );
}

/** Appareils et électroménagers — réfrigérateur. */
export function EmblemElectromenager({ size = 44, tone = "currentColor" }: EmblemProps) {
  const s = common(tone);
  return (
    <Frame size={size} label="Appareils et électroménagers">
      <g {...s}>
        <rect x="16" y="8" width="32" height="48" rx="4" />
        <path d="M16 26h32" />
        <path d="M23 16v5" />
        <path d="M23 33v7" />
        <path d="M20 56v4" />
        <path d="M44 56v4" />
      </g>
    </Frame>
  );
}

/** Téléphones et électronique — combiné et signal. */
export function EmblemTelephone({ size = 44, tone = "currentColor" }: EmblemProps) {
  const s = common(tone);
  return (
    <Frame size={size} label="Téléphones et électronique">
      <g {...s}>
        <rect x="18" y="6" width="24" height="52" rx="4" />
        <path d="M27 13h6" />
        <circle cx="30" cy="50" r="2.2" />
        <path d="M48 20a12 12 0 0 1 0 17" />
        <path d="M54 14a20 20 0 0 1 0 29" />
      </g>
    </Frame>
  );
}

/** Pièces détachées — pignon et bielle. */
export function EmblemPieces({ size = 44, tone = "currentColor" }: EmblemProps) {
  const s = common(tone);
  return (
    <Frame size={size} label="Pièces détachées">
      <g {...s}>
        <circle cx="26" cy="26" r="11" />
        <circle cx="26" cy="26" r="4" />
        <path d="M26 7v6M26 39v6M7 26h6M39 26h6M13 13l4 4M35 35l4 4M39 13l-4 4M17 35l-4 4" />
        <path d="M40 44a8 8 0 1 0 11 11" />
        <circle cx="46" cy="49" r="3" />
      </g>
    </Frame>
  );
}

/** Prestations de services — tampon officiel et registre. */
export function EmblemServices({ size = 44, tone = "currentColor" }: EmblemProps) {
  const s = common(tone);
  return (
    <Frame size={size} label="Prestations de services">
      <g {...s}>
        <rect x="10" y="40" width="44" height="14" rx="3" />
        <path d="M20 40V30a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v10" />
        <path d="M28 24V13a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v11" />
        <path d="M18 47h28" />
      </g>
    </Frame>
  );
}

/** Cosmétiques — flacon et pot de karité. */
export function EmblemCosmetiques({ size = 44, tone = "currentColor" }: EmblemProps) {
  const s = common(tone);
  return (
    <Frame size={size} label="Cosmétiques">
      <g {...s}>
        <path d="M24 22h-6a6 6 0 0 0-6 6v22a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V28a6 6 0 0 0-6-6Z" />
        <path d="M17 14h8v8h-8z" />
        <path d="M12 36h18" />
        <path d="M40 30h12v20a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6Z" />
        <path d="M38 24h16v6H38z" />
      </g>
    </Frame>
  );
}

/** Produits alimentaires & vivriers — panier de marché. */
export function EmblemVivriers({ size = 44, tone = "currentColor" }: EmblemProps) {
  const s = common(tone);
  return (
    <Frame size={size} label="Produits alimentaires et vivriers">
      <g {...s}>
        <path d="M8 24h48l-5 28a6 6 0 0 1-6 5H19a6 6 0 0 1-6-5Z" />
        <path d="M21 24 30 8M43 24 34 8" />
        <path d="M24 36v12M32 36v12M40 36v12" />
      </g>
    </Frame>
  );
}

const MAP: Record<string, (p: EmblemProps) => React.ReactElement> = {
  quincaillerie: EmblemQuincaillerie,
  textile: EmblemTextile,
  electromenager: EmblemElectromenager,
  telephone: EmblemTelephone,
  pieces: EmblemPieces,
  services: EmblemServices,
  cosmetiques: EmblemCosmetiques,
  vivriers: EmblemVivriers,
};

export function Emblem({
  name,
  size = 44,
  tone = "currentColor",
}: {
  name: string;
  size?: number;
  tone?: string;
}) {
  const Cmp = MAP[name] ?? EmblemServices;
  return <Cmp size={size} tone={tone} />;
}
