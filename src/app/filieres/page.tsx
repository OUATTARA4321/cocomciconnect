import Link from "next/link";
import { Emblem } from "@/components/Emblems";
import { Seal } from "@/components/Seal";
import { formatFcfa, getSectors } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Les filières professionnelles — COCOMCI",
  description:
    "Quincaillerie, Textile et Habillement, Appareils et Électroménagers, Téléphones et Électronique, Pièces Détachées, Prestations de Services, Cosmétiques, Produits Alimentaires & Vivriers : les filières de la Coordination des Opérateurs de Commerce de Côte d’Ivoire.",
};

export default async function FilieresPage() {
  const sectors = await getSectors();
  const total = sectors.reduce((sum, s) => sum + s.operators, 0);

  return (
    <>
      {/* Ouverture */}
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute -top-20 -right-16 opacity-[0.07]">
          <Seal id="filieres-band" size={460} tone="#f3ede1" />
        </div>
        <div className="relative mx-auto max-w-[1240px] px-5 pt-16 pb-16">
          <p className="label text-stamp-soft">Organisation professionnelle · Exercice 2026</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.025em] text-paper-2">
            Huit filières, un seul
            <br />
            <span className="text-stamp-soft italic">corps de métier</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-paper-2/85">
            La COCOMCI structure ses adhérents en filières professionnelles. Chaque filière dispose
            d’un président et d’un secrétaire général titulaires d’un badge validé, d’une mercuriale
            indicative propre à son métier et d’une représentation permanente auprès du Bureau Exécutif National.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p className="num font-display text-[2.1rem] leading-none font-semibold text-paper-2">
                {sectors.length}
              </p>
              <p className="label mt-2 text-paper-2/65">filières constituées</p>
            </div>
            <div>
              <p className="num font-display text-[2.1rem] leading-none font-semibold text-paper-2">
                {formatFcfa(total)}
              </p>
              <p className="label mt-2 text-paper-2/65">opérateurs répartis</p>
            </div>
            <div>
              <p className="num font-display text-[2.1rem] leading-none font-semibold text-valid">
                {sectors.length * 2}
              </p>
              <p className="label mt-2 text-paper-2/65">mandats de filière badgés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Les filières */}
      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Répartition par métier</p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-semibold text-ink">
              Chaque filière, son bureau et sa mercuriale.
            </h2>
          </div>

          <div className="mt-10 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s, i) => (
              <Link
                key={s.id}
                href={`/filieres/${s.slug}`}
                className="group flex flex-col bg-paper-2 p-6 transition-colors hover:bg-ink"
                data-reveal
                data-reveal-delay={i * 60}
              >
                <span className="text-ink transition-colors group-hover:text-stamp-soft">
                  <Emblem name={s.emblem} size={46} />
                </span>
                <h3 className="mt-5 font-display text-[1.3rem] leading-[1.12] font-semibold text-ink transition-colors group-hover:text-paper-2">
                  {s.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.85rem] leading-snug text-mute transition-colors group-hover:text-paper-2/70">
                  {s.tagline}
                </p>
                <p className="num mt-5 border-t border-ink/15 pt-3 text-[0.78rem] tracking-wider text-ink/60 transition-colors group-hover:border-paper-2/25 group-hover:text-paper-2/70">
                  {s.operators} opérateurs
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tableau synthétique */}
      <section className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Bureaux de filière</p>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.08] font-semibold text-ink">
              Présidents et secrétaires généraux, badges validés.
            </h2>
          </div>

          <div className="mt-7 overflow-x-auto">
            <table className="ledger w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="label py-3 pr-4 text-ink/65">Filière</th>
                  <th className="label py-3 pr-4 text-ink/65">Président de filière</th>
                  <th className="label py-3 pr-4 text-ink/65">Secrétaire général</th>
                  <th className="label py-3 pr-4 text-ink/65">Places fortes</th>
                  <th className="label py-3 text-right text-ink/65">Opérateurs</th>
                </tr>
              </thead>
              <tbody>
                {sectors.map((s) => (
                  <tr key={s.id}>
                    <td className="py-3.5 pr-4">
                      <Link
                        href={`/filieres/${s.slug}`}
                        className="link-rule font-medium text-ink hover:text-stamp-dark"
                      >
                        {s.name}
                      </Link>
                    </td>
                    <td className="py-3.5 pr-4 text-[0.88rem] text-ink">
                      {s.leadName}
                      <span className="num ml-2 text-[0.72rem] tracking-wider text-ink/45">
                        {s.leadBadge}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-[0.88rem] text-ink">
                      {s.sgName}
                      <span className="num ml-2 text-[0.72rem] tracking-wider text-ink/45">
                        {s.sgBadge}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-[0.84rem] text-mute">{s.citiesLabel}</td>
                    <td className="num py-3.5 text-right text-[0.98rem] font-semibold text-ink">
                      {s.operators}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-ink">
                  <td className="label py-4 pr-4 text-ink" colSpan={4}>
                    Total des adhérents répartis en filières
                  </td>
                  <td className="num py-4 text-right font-display text-[1.3rem] font-semibold text-ink">
                    {formatFcfa(total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
