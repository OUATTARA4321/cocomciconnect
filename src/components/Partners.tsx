import type { Partner } from "@/db/schema";

/**
 * Partenaires de la Coordination.
 *
 * Deux dispositifs complémentaires :
 *   · une frise défilante de sigles, qui signale l'étendue du réseau ;
 *   · une grille classée par nature, qui dit précisément le rôle de chacun.
 *
 * Les partenaires sont représentés par un cartouche typographique — un sigle
 * composé en Fraunces sur pastille teintée — et non par des logotypes
 * d'emprunt. C'est honnête tant que les marques officielles ne sont pas
 * fournies, et visuellement homogène.
 */

const CATEGORIES = [
  {
    key: "Institutionnel",
    titre: "Institutionnels",
    texte: "Tutelles, chambres consulaires et organes de régulation de la profession.",
  },
  {
    key: "Public",
    titre: "Publics",
    texte: "Établissements et agences de l’État associés aux travaux de la Coordination.",
  },
  {
    key: "Privé",
    titre: "Privés",
    texte: "Organisations professionnelles, coopératives et partenaires financiers.",
  },
];

/**
 * Cartouche typographique : sigle sur pastille teintée.
 *
 * Le sigle est tracé en SVG avec `textLength` : quelle que soit sa longueur —
 * « INS » comme « ANADER » — il occupe exactement la largeur utile et ne
 * déborde jamais de la pastille.
 */
function Sigle({
  acronym,
  tint,
  size = 54,
}: {
  acronym: string;
  tint: string;
  size?: number;
}) {
  const BOX = 100;
  const utile = BOX - 26; // 13 unités de marge de chaque côté

  // Le corps est déduit du nombre de caractères : en capitales Fraunces,
  // une lettre occupe environ 0,68 cadratin. Le sigle tient donc toujours,
  // même là où l'attribut SVG textLength n'est pas honoré.
  const avance = 0.68;
  const corps = Math.min(34, utile / (acronym.length * avance));

  return (
    <span
      className="flex shrink-0 items-center justify-center border border-ink/15"
      style={{ width: size, height: size, backgroundColor: `${tint}14` }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${BOX} ${BOX}`} width={size} height={size}>
        <text
          x={BOX / 2}
          y={BOX / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-fraunces), Georgia, serif"
          fontWeight={700}
          fontSize={corps}
          fill={tint}
          textLength={acronym.length >= 5 ? utile : undefined}
          lengthAdjust={acronym.length >= 5 ? "spacingAndGlyphs" : undefined}
        >
          {acronym}
        </text>
      </svg>
    </span>
  );
}

/** Frise défilante des sigles — mouvement lent, en pause au survol. */
export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;
  const strip = [...partners, ...partners];

  return (
    <div className="marquee relative overflow-hidden border-y border-ink/15 bg-paper-3/45">
      <div className="marquee-track items-center py-5" style={{ animationDuration: "64s" }}>
        {strip.map((p, i) => (
          <span
            key={`${p.id}-${i}`}
            className="flex shrink-0 items-center gap-3 px-7"
            title={p.name}
          >
            <Sigle acronym={p.acronym} tint={p.tint} size={42} />
            <span className="max-w-[13rem]">
              <span className="block truncate text-[0.86rem] leading-tight font-medium text-ink">
                {p.acronym}
              </span>
              <span className="label block truncate text-mute/75">{p.category}</span>
            </span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-paper-3/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-paper-3/90 to-transparent" />
    </div>
  );
}

/** Grille classée : institutionnels, publics, privés. */
export function PartnersGrid({ partners }: { partners: Partner[] }) {
  return (
    <div className="space-y-10">
      {CATEGORIES.map((cat) => {
        const liste = partners.filter((p) => p.category === cat.key);
        if (liste.length === 0) return null;

        return (
          <section key={cat.key}>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-ink/20 pt-3.5">
              <h3 className="font-display text-[1.25rem] leading-none font-semibold text-ink">
                Partenaires {cat.titre}
              </h3>
              <p className="flex-1 text-[0.85rem] leading-snug text-mute">{cat.texte}</p>
              <span className="num label text-mute/70">{liste.length}</span>
            </div>

            <ul className="mt-5 grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
              {liste.map((p, i) => (
                <li
                  key={p.id}
                  className="group flex h-full flex-col bg-paper-2 px-5 py-6 transition-colors hover:bg-paper-3/60"
                  data-reveal
                  data-reveal-delay={i * 60}
                >
                  <Sigle acronym={p.acronym} tint={p.tint} />
                  <p className="mt-4 text-[0.95rem] leading-snug font-medium text-ink">
                    {p.name}
                  </p>
                  <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-mute">{p.role}</p>
                  <span
                    aria-hidden="true"
                    className="mt-4 h-[2px] w-9 transition-all duration-300 group-hover:w-16"
                    style={{ backgroundColor: p.tint }}
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
