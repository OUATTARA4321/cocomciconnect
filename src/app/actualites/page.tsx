import { ActivityCarousel } from "@/components/ActivityCarousel";
import { NewsFilter } from "@/components/Interactive";
import { getActivities, getNews, NEWS_CATEGORIES, formatDate } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Actualités du commerce intérieur & de l’économie — COCOMCI",
  description:
    "Dépêches, notes de conjoncture et activités de la COCOMCI : prix des marchés, économie ivoirienne, vie de la Coordination.",
};

export default async function ActualitesPage() {
  const [news, activities] = await Promise.all([getNews(), getActivities()]);
  const latest = news[0];

  const slides = activities.map((a) => ({
    id: a.id,
    title: a.title,
    caption: a.caption,
    place: a.place,
    kind: a.kind,
    image: a.image,
    heldAt: a.heldAt.toISOString(),
  }));

  const rows = news.map((n) => ({
    id: n.id,
    slug: n.slug,
    category: n.category,
    title: n.title,
    excerpt: n.excerpt,
    place: n.place,
    source: n.source,
    image: n.image,
    publishedAt: n.publishedAt.toISOString(),
  }));

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="relative mx-auto max-w-[1240px] px-5 pt-16 pb-16">
          <p className="label text-stamp-soft">Le fil de la Coordination</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.025em] text-paper-2">
            Le commerce intérieur,
            <br />
            l’économie, <span className="text-stamp-soft italic">notre maison</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-paper-2/85">
            Les dépêches rédigées par les sections régionales, la commission économique et le Bureau Exécutif National. Relevés de prix, campagnes agricoles, décisions internes, formations :
            tout ce qui fait la vie des marchés ivoiriens.
          </p>

          {latest && (
            <div className="mt-12 max-w-3xl border-l-2 border-stamp pl-6">
              <p className="label num text-paper-2/70">
                À la une · {formatDate(latest.publishedAt)} · {latest.place}
              </p>
              <p className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2.15rem)] leading-[1.15] font-semibold text-paper-2">
                {latest.title}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Activités en images */}
      <section id="activites" className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <div>
                <p className="label text-stamp-dark">Activités de la COCOMCI · Reportage</p>
                <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-semibold text-ink">
                  Les travaux de la Coordination, en images.
                </h2>
              </div>
              <p className="num label text-mute">{slides.length} photographies</p>
            </div>
          </div>

          <div className="mt-9" data-reveal>
            <ActivityCarousel slides={slides} />
          </div>

          <p className="label mt-5 text-mute/80">
            Défilement automatique · Survolez pour mettre en pause · Flèches ← → pour naviguer
          </p>
        </div>
      </section>

      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <NewsFilter rows={rows} categories={[...NEWS_CATEGORIES]} />
        </div>
      </section>
    </>
  );
}
