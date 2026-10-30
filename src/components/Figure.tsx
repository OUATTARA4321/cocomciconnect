import type { ReactNode } from "react";

/**
 * Cadre photographique de la plateforme.
 *
 * Plutôt qu'un bandeau de couleur plaqué sur l'image, le traitement repose sur :
 *   · un filet d'encre fin qui pose l'image comme une planche imprimée ;
 *   · un liseré clair intérieur, qui crée la respiration d'un passe-partout ;
 *   · un voile dégradé bas, pour la lisibilité du texte ;
 *   · une étiquette de rubrique en verre dépoli, soulignée d'un filet orange.
 *
 * La couleur reste un accent, jamais un aplat qui écrase la photographie.
 */

export function Plate({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <figure
      className={`group relative overflow-hidden border border-ink/25 bg-ink ${
        hover ? "transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(18,48,31,.18)]" : ""
      } ${className}`}
    >
      {children}
      {/* Passe-partout : liseré clair interne, au-dessus de l'image */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 border border-paper-2/18"
      />
    </figure>
  );
}

/** Étiquette de rubrique : verre dépoli, filet orange en pied. */
export function PlateTag({
  children,
  position = "top-left",
}: {
  children: ReactNode;
  position?: "top-left" | "top-right";
}) {
  const place = position === "top-left" ? "top-0 left-0" : "top-0 right-0";
  return (
    <span
      className={`label absolute ${place} z-30 border-b-2 border-stamp bg-ink/55 px-3.5 py-2 text-paper-2 backdrop-blur-md`}
    >
      {children}
    </span>
  );
}

/** Voile dégradé : assure la lisibilité d'une légende posée sur l'image. */
export function PlateScrim({ strength = "normal" }: { strength?: "light" | "normal" | "strong" }) {
  const map = {
    light: "from-ink/75 via-ink/15 to-transparent",
    normal: "from-ink via-ink/35 to-transparent",
    strong: "from-ink via-ink/60 to-ink/10",
  } as const;
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-t ${map[strength]}`}
    />
  );
}

/**
 * Cartel d'identité posé en pied de photographie : filet orange vertical,
 * nom en Fraunces, fonction en petites capitales. Sobre et lisible.
 */
export function PlateCaption({
  title,
  subtitle,
  meta,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
}) {
  return (
    <figcaption className="absolute inset-x-0 bottom-0 z-30 px-4 pb-4 sm:px-5 sm:pb-5">
      <div className="border-l-[3px] border-stamp pl-3.5">
        {meta && <p className="label num text-stamp-soft">{meta}</p>}
        <p className="mt-1 font-display text-[1.1rem] leading-tight font-semibold text-paper-2">
          {title}
        </p>
        {subtitle && (
          <p className="label mt-1.5 text-paper-2/75">{subtitle}</p>
        )}
      </div>
    </figcaption>
  );
}
