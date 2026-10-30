import Link from "next/link";
import { notFound } from "next/navigation";
import { Trend } from "@/components/Bits";
import { Seal } from "@/components/Seal";
import {
  formatDate,
  formatFcfa,
  getCommodities,
  getNews,
  getNewsItem,
  variation,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  return {
    title: item ? `${item.title} — COCOMCI` : "Actualité — COCOMCI",
    description: item?.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();

  const [others, commodities] = await Promise.all([getNews(6), getCommodities()]);
  const related = others.filter((n) => n.slug !== item.slug).slice(0, 3);
  const highlight = commodities.slice(0, 5);
  const paragraphs = item.body.split(/\n{2,}/);

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        {item.image && (
          <>
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/45" />
          </>
        )}
        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-16">
          <Link href="/actualites" className="label link-rule text-stamp-soft">
            ← Toutes les actualités
          </Link>
          <p className="label mt-10 text-paper-2/75">
            {item.category} · {formatDate(item.publishedAt)} · {item.place}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.1rem,4.6vw,3.7rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-paper-2">
            {item.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.12rem] leading-relaxed text-paper-2/85">
            {item.excerpt}
          </p>
          <p className="label mt-8 text-paper-2/60">Source : {item.source}</p>
        </div>
      </section>

      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <div className="grid gap-x-14 gap-y-14 lg:grid-cols-12">
            <article className="lg:col-span-7">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[1.1rem] leading-[1.78] text-ink/88 ${
                    i === 0 ? "dropcap" : "mt-6"
                  }`}
                >
                  {p}
                </p>
              ))}

              <div className="mt-12 flex items-start gap-5 border-t border-ink/15 pt-8">
                <Seal id="article" size={64} tone="#b23f14" className="shrink-0" />
                <div>
                  <p className="label text-stamp-dark">Document de référence</p>
                  <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-mute">
                    Cette dépêche est publiée par la COCOMCI et peut être reproduite à des fins
                    d’information sous réserve de mentionner la source. Les cours cités sont
                    indicatifs au jour du relevé.
                  </p>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="rule-heavy pt-4">
                  <p className="label text-stamp-dark">Cours du jour</p>
                </div>
                <table className="ledger mt-5 w-full border-collapse text-left">
                  <tbody>
                    {highlight.map((c) => (
                      <tr key={c.id}>
                        <td className="py-3 pr-3 text-[0.92rem] text-ink">{c.name}</td>
                        <td className="num py-3 pr-3 text-right text-[0.98rem] font-semibold text-ink">
                          {formatFcfa(c.price)}
                        </td>
                        <td className="py-3 text-right">
                          <Trend value={variation(c.price, c.previousPrice)} align="right" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link href="/cotations" className="label link-rule mt-5 inline-block text-stamp-dark">
                  Voir toute la table des cotations →
                </Link>

                <div className="mt-12 rule-heavy pt-4">
                  <p className="label text-stamp-dark">À lire également</p>
                </div>
                <ul className="mt-5 divide-y divide-ink/12">
                  {related.map((n) => (
                    <li key={n.id}>
                      <Link href={`/actualites/${n.slug}`} className="group block py-4">
                        <p className="label num text-mute">
                          {formatDate(n.publishedAt)} · {n.category}
                        </p>
                        <p className="mt-2 text-[1.02rem] leading-snug font-medium text-ink transition-colors group-hover:text-stamp-dark">
                          {n.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
