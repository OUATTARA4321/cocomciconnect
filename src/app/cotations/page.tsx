import { CotationsBoard, CurrencyBoard } from "@/components/Interactive";
import { SectionHead } from "@/components/Bits";
import { getCommodities, getCurrencies, formatFcfa, formatDate } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cours des produits & devises — COCOMCI",
  description:
    "Table des cotations COCOMCI : matières premières, céréales, produits vivriers, maraîchers, protéines, relevés sur les marchés de Côte d’Ivoire, et cours des devises en FCFA.",
};

const MARCHES = [
  "Marché de Treichville — Abidjan",
  "Marché d’Adjamé 220 Logements — Abidjan",
  "Marché de Yopougon Siporex — Yopougon",
  "Marché Air France 2 — Bouaké",
  "Marché de Korhogo — Korhogo",
  "Marché de Daloa — Daloa",
  "Marché de San-Pédro — San-Pédro",
  "Marché d’Abengourou — Abengourou",
];

export default async function CotationsPage() {
  const [commodities, currencies] = await Promise.all([getCommodities(), getCurrencies()]);

  const rows = commodities.map((c) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    unit: c.unit,
    market: c.market,
    city: c.city,
    price: c.price,
    previousPrice: c.previousPrice,
    trend: c.trend,
  }));

  const devRows = currencies.map((d) => ({
    id: d.id,
    code: d.code,
    name: d.name,
    rate: d.rate,
    changePct: d.changePct,
    note: d.note,
  }));

  const cheapest = [...commodities].sort((a, b) => b.price - a.price).slice(0, 3);

  return (
    <>
      {/* Bandeau d’ouverture */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src="images/cereales.jpg"
          alt="Sacs de riz et de céréales empilés dans un entrepôt"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-55"
        />
        <span className="label absolute top-0 left-0 z-30 border-b-2 border-stamp bg-ink/55 px-3.5 py-2 text-paper-2 backdrop-blur-md">
          Mercuriale
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/25" />
        <div className="relative mx-auto max-w-[1240px] px-5 pt-16 pb-16">
          <p className="label text-stamp-soft">
            Bulletin des cours n° 214 · Relevé du {formatDate(new Date("2026-02-12"))}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.025em] text-paper-2">
            Cours des matières premières,
            <br />
            des vivriers et des <span className="text-stamp-soft italic">marchés locaux</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-paper-2/85">
            Sucre, huile, farine, poisson, viande, riz, lait, céréales, produits vivriers et
            maraîchers : les prix relevés chaque matin par les sections régionales sur les marchés de
            gros et de demi-gros, consolidés au siège de la COCOMCI.
          </p>

          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
            {cheapest.map((c) => (
              <div key={c.id} className="border-l-2 border-stamp pl-4">
                <p className="label text-paper-2/65">{c.name}</p>
                <p className="num mt-1.5 font-display text-[1.6rem] leading-none font-semibold text-paper-2">
                  {formatFcfa(c.price)}
                  <span className="ml-1 text-[0.8rem] font-normal text-paper-2/65">
                    F/{c.unit === "litre" ? "L" : c.unit}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table des cotations */}
      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <SectionHead
            eyebrow="Table des cotations"
            title="Tous les produits cotés, marché par marché."
            intro="Les prix s’entendent en francs CFA, hors négociation de volume. La variation compare le cours du jour à celui de la veille de relevé."
          />
          <div className="mt-10">
            <CotationsBoard rows={rows} />
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-8 border-t-2 border-ink pt-8 lg:grid-cols-3">
            <div>
              <p className="label text-stamp-dark">Méthode de relevé</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
                Les relevés sont effectués entre 6h et 8h30 par les responsables régionaux, sur les
                étals de gros. Chaque prix est confirmé par au moins trois opérateurs du marché avant
                publication. Les cours sont indicatifs et ne constituent pas une obligation de vente.
              </p>
            </div>
            <div>
              <p className="label text-stamp-dark">Unités retenues</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
                Le kilogramme pour les céréales, vivriers, maraîchers et protéines ; le litre pour les
                huiles ; la boîte, le paquet ou la pièce pour les produits conditionnés. Les sacs de
                25 kg et de 50 kg sont convertis au kilo.
              </p>
            </div>
            <div>
              <p className="label text-stamp-dark">Marchés suivis</p>
              <ul className="mt-3 space-y-1.5 text-[0.92rem] leading-relaxed text-mute">
                {MARCHES.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Devises */}
      <section id="devises" className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <SectionHead
            eyebrow="Marché des changes"
            title="Cours des devises en francs CFA."
            intro="Parité fixe de l’euro, cours indicatifs pour les autres monnaies du sous-continent et des principales places financières."
            action={{ href: "/actualites", label: "Lire la note sur la parité" }}
          />
          <div className="mt-10">
            <CurrencyBoard rows={devRows} />
          </div>
        </div>
      </section>
    </>
  );
}
