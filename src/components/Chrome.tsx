import Link from "next/link";
import { GridMenu } from "@/components/GridMenu";
import { CI_GREEN, CI_ORANGE, LogoMark } from "@/components/Logo";
import { Seal } from "@/components/Seal";
import { getCurrencies, getCommodities, formatFcfa, formatRate, formatPercent, variation } from "@/lib/data";

export function SiteHeader() {
  return (
    <>
      <header>
      {/* Bandeau institutionnel */}
      <div className="bg-ink text-paper-2">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2">
          <p className="label text-paper-2/85">
            Coordination des Opérateurs de Commerce de Côte d&apos;Ivoire
          </p>
          <span className="flex items-center gap-5">
            <Link
              href="/administration"
              className="label link-rule text-paper-2/80 hover:text-paper-2"
            >
              Administration
            </Link>
            <span className="label num text-stamp-soft">
              Bulletin n° 214 · 12 février 2026
            </span>
          </span>
        </div>
      </div>

      {/* Titre */}
      <div className="mx-auto max-w-[1240px] px-5 pt-7 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6">
          {/* Bloc-marque : emblème + logotype, alignés sur la hauteur de capitale */}
          <Link
            href="/"
            aria-label="COCOMCI — retour à l’accueil"
            className="group flex items-center gap-3.5 sm:gap-4"
          >
            <LogoMark
              size={54}
              tone="color"
              className="shrink-0 transition-opacity duration-300 group-hover:opacity-85"
            />

            {/* Filet de séparation : zone de protection matérialisée */}
            <span aria-hidden="true" className="h-11 w-px bg-ink/15" />

            <span className="leading-none">
              <span
                className="block font-sans text-[1.95rem] leading-[0.86] font-bold tracking-[-0.018em] sm:text-[2.35rem]"
                style={{ color: CI_GREEN }}
              >
                COCOMCI
              </span>
              <span className="mt-[7px] block max-w-[22rem] text-[0.7rem] leading-snug tracking-[0.02em] text-mute">
                Coordination des Opérateurs de Commerce de Côte d’Ivoire
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden text-right lg:block">
              <p className="label text-ink/60">Bureau Exécutif National</p>
              <p className="mt-1.5 text-[0.82rem] leading-tight text-mute">
                Plateau, Abidjan · Depuis 2011
              </p>
            </div>
            <div className="hidden border-l border-ink/15 pl-6 sm:block">
              <p className="label" style={{ color: CI_ORANGE }}>
                Bulletin n° 214
              </p>
              <p className="num mt-1.5 text-[0.82rem] leading-tight text-mute">
                Relevé du 12 février 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      </header>

      {/* Barre collante : le carré du sommaire, puis le défilement des cours.
          Les rubriques sont repliées dans le carré et n'apparaissent qu'au clic. */}
      <div className="sticky top-0 z-50 flex items-stretch border-y border-ink/20 bg-ink">
        <GridMenu />
        <div className="min-w-0 flex-1">
          <CoursTicker />
        </div>
      </div>
    </>
  );
}

/** Bandeau défilant des cours du jour — mouvement mécanique, mis en pause au survol. */
export async function CoursTicker() {
  let items: string[] = [];
  try {
    const [coms, devs] = await Promise.all([getCommodities(), getCurrencies()]);
    items = coms.slice(0, 14).map((c) => {
      const pct = variation(c.price, c.previousPrice);
      const shortUnit =
        c.unit === "litre" ? "L" : c.unit === "pièce" ? "pce" : c.unit === "boîte" ? "boîte" : c.unit;
      return `${c.name.toUpperCase()} · ${formatFcfa(c.price)} F/${shortUnit} · ${formatPercent(pct)}`;
    });
    const dev = devs.filter((d) => ["USD", "EUR", "GBP", "GNF", "GHS", "NGN"].includes(d.code));
    items.push(...dev.map((d) => `${d.code}/XOF · ${formatRate(d.rate)} · ${formatPercent(d.changePct)}`));
  } catch {
    items = ["BULLETIN DES COURS COCOMCI · RELEVÉ DU 12 FÉVRIER 2026"];
  }

  const strip = [...items, ...items];

  return (
    <div className="marquee relative h-full overflow-hidden bg-ink-2">
      <div className="marquee-track h-full items-center py-3">
        {strip.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="label num flex items-center gap-3 whitespace-nowrap px-5 text-paper-2/85"
          >
            <span aria-hidden="true" className="text-stamp-soft">
              ◆
            </span>
            {text}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink-2 to-transparent" />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper-2">
      <div className="pointer-events-none absolute -right-16 -bottom-24 opacity-[0.07]">
        <Seal id="footer" size={420} tone="#f3ede1" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4">
              {/* Sur fond d'encre, l'emblème est posé sur une réserve claire :
                  les couleurs de la marque restent exactes. */}
              <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center bg-paper-2">
                <LogoMark size={46} tone="color" />
              </span>
              <div>
                <p className="font-sans text-[1.45rem] leading-none font-bold tracking-[-0.012em]">
                  COCOMCI
                </p>
                <span aria-hidden="true" className="mt-2 flex h-[2px] w-[92px] overflow-hidden">
                  <span className="flex-1" style={{ background: CI_ORANGE }} />
                  <span className="flex-[2] bg-paper-2/40" />
                </span>
                <p className="label mt-2 text-paper-2/60">Depuis 2011</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[0.88rem] leading-relaxed text-paper-2/75">
              Coordination des Opérateurs de Commerce de Côte d&apos;Ivoire. Bureau Exécutif
              National, commissions permanentes et dix-neuf représentations régionales.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label text-stamp-soft">Le siège</p>
            <address className="mt-4 space-y-1 text-[0.88rem] leading-relaxed text-paper-2/80 not-italic">
              <p>Immeuble Alpha 2000, 4ᵉ étage</p>
              <p>Rue du Commerce, Plateau</p>
              <p>01 BP 4412 Abidjan 01</p>
              <p className="num pt-2">+225 27 20 31 48 62</p>
              <p>contact@cocomci.ci</p>
            </address>
          </div>

          <div className="md:col-span-2">
            <p className="label text-stamp-soft">Le bulletin</p>
            <ul className="mt-4 space-y-2 text-[0.88rem] text-paper-2/80">
              <li>
                <Link href="/cotations" className="link-rule hover:text-paper-2">
                  Cours des produits
                </Link>
              </li>
              <li>
                <Link href="/cotations#devises" className="link-rule hover:text-paper-2">
                  Cours des devises
                </Link>
              </li>
              <li>
                <Link href="/filieres" className="link-rule hover:text-paper-2">
                  Les filières
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="link-rule hover:text-paper-2">
                  Dépêches & notes
                </Link>
              </li>
              <li>
                <Link href="/membres" className="link-rule hover:text-paper-2">
                  Annuaire des adhérents
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-stamp-soft">Représentations régionales</p>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-paper-2/80">
              Abidjan · Yamoussoukro · Bouaké · Korhogo · Daloa · San-Pédro · Abengourou ·
              Bondoukou · Séguéla · Divo · Soubré · Touba · Odienné · Katiola
            </p>
            <p className="label mt-6 text-paper-2/55">Permanence</p>
            <p className="num mt-2 text-[0.88rem] text-paper-2/80">
              Lundi – vendredi, 8h – 17h
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper-2/20 pt-6">
          <p className="label text-paper-2/70">
            © 2026 COCOMCI — Tous droits réservés · Cours indicatifs relevés sur les marchés
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/administration"
              className="label link-rule inline-flex items-center gap-2 text-paper-2/70 hover:text-paper-2"
            >
              <LogoMark size={14} tone="paper" title="" />
              Espace administration
            </Link>
            <span className="label text-paper-2/70">Abidjan, Côte d&apos;Ivoire</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
