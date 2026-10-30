import Link from "next/link";
import { notFound } from "next/navigation";
import { Emblem } from "@/components/Emblems";
import { WhatsAppButton } from "@/components/Contact";
import { OfficialBadge, Seal } from "@/components/Seal";
import {
  formatDateShort,
  formatFcfa,
  getSector,
  getSectorArticles,
  getSectors,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = await getSector(slug);
  return {
    title: sector ? `Filière ${sector.name} — COCOMCI` : "Filière — COCOMCI",
    description: sector?.tagline,
  };
}

export default async function FilierePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = await getSector(slug);
  if (!sector) notFound();

  const [articles, all] = await Promise.all([getSectorArticles(slug), getSectors()]);
  const others = all.filter((s) => s.slug !== slug);
  const mid = (a: { priceLow: number; priceHigh: number }) => (a.priceLow + a.priceHigh) / 2;
  const maxMid = Math.max(...articles.map(mid), 1);

  return (
    <>
      {/* Ouverture */}
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute -right-14 -bottom-28 opacity-[0.07]">
          <Seal id="filiere-band" size={420} tone="#f3ede1" />
        </div>
        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-16">
          <Link href="/filieres" className="label link-rule text-stamp-soft">
            ← Toutes les filières
          </Link>

          <div className="mt-10 flex flex-wrap items-start gap-x-8 gap-y-6">
            <span className="text-stamp-soft">
              <Emblem name={sector.emblem} size={76} />
            </span>
            <div className="min-w-[18rem] flex-1">
              <p className="label text-paper-2/70">Filière professionnelle · COCOMCI</p>
              <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.025em] text-paper-2">
                {sector.name}
              </h1>
              <p className="mt-4 text-[1.05rem] text-stamp-soft italic">{sector.tagline}</p>
            </div>
          </div>

          <div className="mt-10 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            <div className="border-l-2 border-stamp pl-4">
              <p className="num font-display text-[1.9rem] leading-none font-semibold text-paper-2">
                {sector.operators}
              </p>
              <p className="label mt-2 text-paper-2/65">opérateurs</p>
            </div>
            <div className="border-l-2 border-stamp pl-4">
              <p className="num font-display text-[1.9rem] leading-none font-semibold text-paper-2">
                {articles.length}
              </p>
              <p className="label mt-2 text-paper-2/65">articles suivis</p>
            </div>
            <div className="border-l-2 border-stamp pl-4">
              <p className="num font-display text-[1.9rem] leading-none font-semibold text-valid">
                2/2
              </p>
              <p className="label mt-2 text-paper-2/65">badges validés</p>
            </div>
            <div className="border-l-2 border-stamp pl-4">
              <p className="num font-display text-[1.9rem] leading-none font-semibold text-paper-2">
                {formatDateShort(sector.validatedAt)}
              </p>
              <p className="label mt-2 text-paper-2/65">dernière validation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation + bureau */}
      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rule-heavy pt-5">
                <p className="label text-stamp-dark">La filière</p>
              </div>
              <p className="dropcap mt-6 text-[1.1rem] leading-[1.78] text-ink/88">
                {sector.description}
              </p>

              <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-ink/15 pt-7 sm:grid-cols-2">
                <div>
                  <p className="label text-stamp-dark">Places fortes</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
                    {sector.marketsLabel}
                  </p>
                </div>
                <div>
                  <p className="label text-stamp-dark">Implantation</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
                    {sector.citiesLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rule-heavy pt-5">
                <p className="label text-stamp-dark">Bureau de filière · Badges validés</p>
              </div>
              <div className="mt-6 space-y-7">
                <div>
                  <OfficialBadge
                    id={`fil-lead-${sector.slug}`}
                    badgeNumber={sector.leadBadge}
                    name={sector.leadName}
                    title={sector.leadRole}
                    region="Filière"
                    city={sector.name}
                    status="Badge validé"
                    photo={sector.leadPhoto}
                  />
                  <div className="flex flex-wrap items-center gap-3 border-x border-b border-ink/25 bg-paper-2 px-3 py-3">
                    {sector.leadPhone && (
                      <a
                        href={`tel:+${(sector.leadWhatsapp ?? "").replace(/\D/g, "")}`}
                        className="num text-[0.8rem] text-ink/75 hover:text-ink"
                      >
                        {sector.leadPhone}
                      </a>
                    )}
                    {sector.leadWhatsapp && (
                      <WhatsAppButton
                        number={sector.leadWhatsapp}
                        name={sector.leadName}
                        role={sector.name}
                        label="WhatsApp"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <OfficialBadge
                    id={`fil-sg-${sector.slug}`}
                    badgeNumber={sector.sgBadge}
                    name={sector.sgName}
                    title={sector.sgRole}
                    region="Filière"
                    city={sector.name}
                    status="Badge validé"
                    photo={sector.sgPhoto}
                  />
                  <div className="flex flex-wrap items-center gap-3 border-x border-b border-ink/25 bg-paper-2 px-3 py-3">
                    {sector.sgPhone && (
                      <a
                        href={`tel:+${(sector.sgWhatsapp ?? "").replace(/\D/g, "")}`}
                        className="num text-[0.8rem] text-ink/75 hover:text-ink"
                      >
                        {sector.sgPhone}
                      </a>
                    )}
                    {sector.sgWhatsapp && (
                      <WhatsAppButton
                        number={sector.sgWhatsapp}
                        name={sector.sgName}
                        role={sector.name}
                        label="WhatsApp"
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className="label mt-5 text-mute/80">
                Mandats validés par le Secrétariat Général le {formatDateShort(sector.validatedAt)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mercuriale de la filière */}
      <section className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Mercuriale indicative</p>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.08] font-semibold text-ink">
              Fourchettes de prix constatées sur les étals.
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-mute">
              Les montants s’entendent en francs CFA, relevés auprès des opérateurs de la filière.
              Ils encadrent la négociation sans la remplacer : l’écart entre le bas et le haut de
              fourchette traduit la qualité, l’origine et le volume commandé.
            </p>
          </div>

          <div className="mt-7 overflow-x-auto">
            <table className="ledger w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="label py-3 pr-4 text-ink/65">Article</th>
                  <th className="label py-3 pr-4 text-ink/65">Unité</th>
                  <th className="label py-3 pr-4 text-ink/65">Place de relevé</th>
                  <th className="label py-3 pr-4 text-right text-ink/65">Bas de fourchette</th>
                  <th className="label py-3 pr-4 text-right text-ink/65">Haut de fourchette</th>
                  <th className="label py-3 text-right text-ink/65">Amplitude</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => {
                  const width = Math.max(6, (mid(a) / maxMid) * 100);
                  const spread = ((a.priceHigh - a.priceLow) / a.priceLow) * 100;
                  return (
                    <tr key={a.id} data-reveal>
                      <td className="py-3.5 pr-4 font-medium text-ink">{a.label}</td>
                      <td className="py-3.5 pr-4 text-[0.85rem] text-mute">{a.unit}</td>
                      <td className="py-3.5 pr-4 text-[0.85rem] text-mute">{a.market}</td>
                      <td className="num py-3.5 pr-4 text-right text-[1rem] font-semibold text-ink">
                        {formatFcfa(a.priceLow)}
                      </td>
                      <td className="num py-3.5 pr-4 text-right text-[1rem] font-semibold text-ink">
                        {formatFcfa(a.priceHigh)}
                      </td>
                      <td className="py-3.5">
                        <span className="flex items-center justify-end gap-3">
                          <span className="num text-[0.8rem] text-mute">
                            +{spread.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} %
                          </span>
                          <span className="hidden h-[6px] w-[110px] bg-ink/10 sm:block">
                            <span
                              className="block h-full bg-stamp/70"
                              style={{ width: `${width}%` }}
                            />
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="label mt-6 text-mute/80">
            Relevé de février 2026 · Prix indicatifs en FCFA · Hors remise de volume
          </p>
        </div>
      </section>

      {/* Autres filières */}
      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-14">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Les autres filières</p>
          </div>
          <div className="mt-8 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/filieres/${s.slug}`}
                className="group flex items-center gap-4 bg-paper-2 p-5 transition-colors hover:bg-ink"
              >
                <span className="shrink-0 text-ink transition-colors group-hover:text-stamp-soft">
                  <Emblem name={s.emblem} size={32} />
                </span>
                <span>
                  <span className="block text-[0.98rem] leading-tight font-medium text-ink transition-colors group-hover:text-paper-2">
                    {s.name}
                  </span>
                  <span className="num mt-1 block text-[0.74rem] tracking-wider text-ink/55 transition-colors group-hover:text-paper-2/65">
                    {s.operators} opérateurs
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
