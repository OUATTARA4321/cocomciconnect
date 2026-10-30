import Link from "next/link";
import { ActivityCarousel } from "@/components/ActivityCarousel";
import { Trend } from "@/components/Bits";
import { Emblem } from "@/components/Emblems";
import { ContactForm } from "@/components/ContactForm";
import { Plate, PlateCaption, PlateScrim, PlateTag } from "@/components/Figure";
import { PartnersGrid, PartnersMarquee } from "@/components/Partners";
import { AccesRapides, Rubrique, ServicesAdherents } from "@/components/Rubriques";
import { IdPhoto, OfficialBadge, Seal } from "@/components/Seal";
import {
  formatDate,
  formatFcfa,
  formatRate,
  getActivities,
  getCommodities,
  getCurrencies,
  getMembers,
  getNews,
  getPartners,
  getSectors,
  variation,
} from "@/lib/data";

export const dynamic = "force-dynamic";

const CLES = [
  { value: 1240, label: "opérateurs adhérents", detail: "sur dix-neuf régions" },
  { value: 8, label: "filières professionnelles", detail: "du vivrier à la quincaillerie" },
  { value: 38, label: "marchés suivis", detail: "relevés chaque matin" },
  { value: 2011, label: "année de fondation", detail: "quinze ans d’organisation" },
];

export default async function HomePage() {
  const [commodities, currencies, news, members, sectors, activities, partners] =
    await Promise.all([
      getCommodities(),
      getCurrencies(),
      getNews(4),
      getMembers(),
      getSectors(),
      getActivities(),
      getPartners(),
    ]);

  const activitySlides = activities.map((a) => ({
    id: a.id,
    title: a.title,
    caption: a.caption,
    place: a.place,
    kind: a.kind,
    image: a.image,
    heldAt: a.heldAt.toISOString(),
  }));

  const byName = (n: string) => commodities.find((c) => c.name.startsWith(n));
  const heroCourses = [
    byName("Riz brisure"),
    byName("Huile de palme"),
    byName("Tomate"),
    byName("Viande de bœuf"),
  ].filter(Boolean) as typeof commodities;

  const featured = commodities.slice(0, 8);
  const devises = currencies.filter((d) => ["EUR", "USD", "GBP", "NGN", "GHS"].includes(d.code));
  const featuredNews = news[0];
  const bneMembers = members.filter((m) => m.isBne).slice(0, 6);
  const president =
    members.find((m) => m.function.startsWith("Président du Bureau")) ?? bneMembers[0];
  const cardMembers = members.filter((m) => !m.isBne).slice(0, 3);

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src="images/marche.jpg"
          alt="Allée du marché de Treichville à Abidjan au petit matin"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-[0.58]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45" />

        <div className="relative mx-auto max-w-[1240px] px-5 pt-16 pb-[16rem] sm:pt-24 lg:pb-48">
          <div className="max-w-3xl">
            <p className="label text-stamp-soft">
              Bulletin n° 214 · Relevé du 12 février 2026 · Prix en FCFA
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.7rem,7vw,5.4rem)] leading-[0.9] font-semibold tracking-[-0.028em] text-paper-2">
              La voix organisée du
              <br />
              commerce intérieur
              <br />
              <span className="text-stamp-soft italic">ivoirien.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[1.06rem] leading-relaxed text-paper-2/85">
              La COCOMCI réunit les opérateurs des marchés de gros et de détail des dix-neuf
              régions, publie les cours des matières premières et des vivriers, et veille à une
              fixation des prix juste sur les marchés locaux.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/cotations"
                className="label inline-flex items-center gap-2 bg-stamp px-6 py-4 text-paper-2 transition-colors hover:bg-stamp-dark"
              >
                Consulter la mercuriale du jour
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/#presidence" className="label link-rule text-paper-2/90 hover:text-paper-2">
                Le mot du Président
              </Link>
            </div>
          </div>
        </div>

        {/* Cours du jour, posés sur l'image */}
        <div className="absolute inset-x-0 bottom-0 border-t border-paper-2/25 bg-ink/92 backdrop-blur-[2px]">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 divide-x divide-paper-2/15 px-5 lg:grid-cols-4">
            {heroCourses.map((c, i) => {
              const pct = variation(c.price, c.previousPrice);
              return (
                <div key={c.id} className={`py-5 ${i % 2 === 1 ? "pl-5" : "pr-5"} lg:px-6`}>
                  <p className="label text-paper-2/60">{c.name}</p>
                  <p className="num mt-2 font-display text-[1.75rem] leading-none font-semibold text-paper-2">
                    {formatFcfa(c.price)}
                    <span className="ml-1 text-[0.85rem] font-normal text-paper-2/60">
                      F/{c.unit === "litre" ? "L" : c.unit}
                    </span>
                  </p>
                  <p className="mt-1.5">
                    <Trend value={pct} onDark />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ ACCÈS RAPIDES ═══════════ */}
      <AccesRapides />

      {/* ═══════════ 01 · MERCURIALE ═══════════ */}
      <section className="relative bg-paper-2 grain">
        <div className="pointer-events-none absolute top-12 right-[-70px] opacity-[0.045]">
          <Seal id="mercuriale-filigrane" size={400} tone="#12301f" />
        </div>

        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <Rubrique
            n="01"
            eyebrow="Mercuriale · Marchés de gros"
            title={
              <>
                Les cours du jour, relevés
                <br />
                sur les étals avant huit heures.
              </>
            }
            intro="Prix de vente en gros, hors négociation de volume. Chaque cours est confirmé par trois opérateurs de la section régionale avant publication."
            action={{ href: "/cotations", label: "Les 28 produits" }}
            align="between"
          />

          <div className="mt-8 overflow-x-auto">
            <table className="ledger w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="label pb-3 pr-4 text-ink/65">Produit</th>
                  <th className="label pb-3 pr-4 text-ink/65">Catégorie</th>
                  <th className="label pb-3 pr-4 text-ink/65">Marché de relevé</th>
                  <th className="label pb-3 pr-4 text-right text-ink/65">Cours</th>
                  <th className="label pb-3 pr-4 text-right text-ink/65">Veille</th>
                  <th className="label pb-3 text-right text-ink/65">Variation</th>
                </tr>
              </thead>
              <tbody>
                {featured.map((c) => {
                  const pct = variation(c.price, c.previousPrice);
                  return (
                    <tr key={c.id} data-reveal>
                      <td className="py-3.5 pr-4">
                        <span className="font-medium text-ink">{c.name}</span>
                        <span className="ml-2 text-[0.78rem] text-mute">({c.unit})</span>
                      </td>
                      <td className="py-3.5 pr-4 text-[0.86rem] text-mute">{c.category}</td>
                      <td className="py-3.5 pr-4 text-[0.86rem] text-mute">
                        {c.market}
                        <span className="ml-1.5 text-ink/45">{c.city}</span>
                      </td>
                      <td className="num py-3.5 pr-4 text-right text-[1.02rem] font-semibold text-ink">
                        {formatFcfa(c.price)}
                      </td>
                      <td className="num py-3.5 pr-4 text-right text-[0.88rem] text-mute">
                        {formatFcfa(c.previousPrice)}
                      </td>
                      <td className="py-3.5 text-right">
                        <Trend value={pct} align="right" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="label mt-6 text-mute/80">
            Prix en francs CFA (XOF) · Relevé du 12 février 2026, 8h10 · Cours indicatifs
          </p>
        </div>
      </section>

      {/* ═══════════ CHIFFRES CLÉS ═══════════ */}
      <section className="border-y border-ink/15 bg-paper-3/55">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-y-9 px-5 py-14 lg:grid-cols-4">
          {CLES.map((k) => (
            <div key={k.label} className="pr-6">
              <p
                className="num font-display text-[clamp(2.2rem,4.2vw,3.5rem)] leading-none font-semibold text-ink"
                data-count={k.value}
              >
                {k.value.toLocaleString("fr-FR")}
              </p>
              <p className="mt-3 max-w-[13rem] text-[0.9rem] leading-snug font-medium text-ink/80">
                {k.label}
              </p>
              <p className="mt-1 max-w-[13rem] text-[0.8rem] leading-snug text-mute">{k.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 02 · LE MOT DU PRÉSIDENT ═══════════ */}
      <section id="presidence" className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <Rubrique
            n="02"
            eyebrow="Le mot du Président du Bureau Exécutif National"
            title={
              <>
                « Organiser le commerce, c’est
                <br />
                protéger le pouvoir d’achat. »
              </>
            }
          />

          <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-12">
            <article className="lg:col-span-7">
              <p className="dropcap text-[1.12rem] leading-[1.72] text-ink/90">
                Mesdames, Messieurs les opérateurs, chers adhérents, le marché ivoirien traverse une
                période de recomposition. Les arrivages se rétablissent, les prix de gros se
                stabilisent sur plusieurs denrées de base, mais la tension reste vive sur les
                produits frais et sur les protéines animales. Notre devoir est de regarder ces
                chiffres en face et d’en tirer des décisions.
              </p>
              <p className="mt-5 text-[1.06rem] leading-[1.75] text-ink/85">
                Depuis quinze ans, la COCOMCI a fait le choix de la méthode : le relevé quotidien
                des cours, la transparence des prix de gros, la formalisation des étals et le
                dialogue régulier avec les pouvoirs publics. Ce bulletin que vous lisez n’est pas un
                simple document administratif. C’est la mémoire vivante de nos marchés, le point de
                départ de toute négociation loyale entre producteurs, grossistes, transporteurs et
                détaillants.
              </p>
              <p className="mt-5 text-[1.06rem] leading-[1.75] text-ink/85">
                La session ordinaire du Bureau Exécutif National a arrêté six décisions fortes : le
                recensement des opérateurs sur trente-huit marchés communaux, la création d’un fonds
                de solidarité, la formation de trois cents vendeurs à l’hygiène alimentaire,
                l’harmonisation des numéros de badge, la reprise des assises régionales et la
                diffusion imprimée du bulletin dans les préfectures.
              </p>
              <p className="mt-5 text-[1.06rem] leading-[1.75] text-ink/85">
                À chacune et à chacun, je demande une chose : tenir le rang. Afficher son badge,
                respecter les unités de mesure, signaler les pratiques abusives aux responsables
                régionaux, transmettre vos relevés de prix chaque lundi. C’est ainsi que nous
                construirons un commerce intérieur ordonné, honnête et prospère.
              </p>

              <div className="mt-10 flex items-end gap-6 border-t border-ink/15 pt-8">
                <Seal id="signature" size={84} tone="#b23f14" />
                <div>
                  <p className="font-display text-[1.6rem] leading-none font-semibold italic text-ink">
                    KAMAGATÉ Lamine
                  </p>
                  <p className="label mt-2.5 text-mute">
                    Président du Bureau Exécutif National · COCOMCI
                  </p>
                  <p className="num mt-1 text-[0.84rem] text-mute/80">Abidjan, le 12 février 2026</p>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <Plate className="badge-card">
                  {president?.photo ? (
                    <span className="idphoto block h-[380px] w-full">
                      <img
                        src={president.photo}
                        alt={`Portrait de ${president.fullName}, Président du Bureau Exécutif National`}
                        className="h-full w-full object-cover object-[50%_18%]"
                      />
                    </span>
                  ) : (
                    <span className="reportage block h-[380px] w-full">
                      <img
                        src="images/presidence.jpg"
                        alt="Bureau du Président : documents tamponnés, plume et tissu ivoirien"
                        className="h-full w-full object-cover"
                      />
                    </span>
                  )}
                  <PlateScrim strength="light" />
                  <PlateCaption
                    title={president?.fullName ?? "KAMAGATÉ Lamine"}
                    subtitle="Président du Bureau Exécutif National"
                  />
                </Plate>

                <div className="mt-6 border border-ink/15 bg-paper-2 p-6">
                  <p className="label text-stamp-dark">Le Bureau Exécutif National</p>
                  <ul className="mt-5 divide-y divide-ink/10">
                    {bneMembers.map((m) => (
                      <li key={m.id} className="badge-card flex items-center gap-3 py-3">
                        <IdPhoto id={`bne-list-${m.id}`} src={m.photo} name={m.fullName} width={40} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.95rem] leading-tight font-medium text-ink">
                            {m.fullName}
                          </p>
                          <p className="mt-0.5 text-[0.8rem] leading-snug text-mute">{m.function}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Link href="/membres" className="label link-rule mt-5 inline-block text-stamp-dark">
                    Voir l’annuaire complet
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════ 03 · FILIÈRES ═══════════ */}
      <section className="relative bg-ink grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <Rubrique
            n="03"
            tone="paper"
            eyebrow="Organisation professionnelle"
            title="Huit filières, du sac de ciment au flacon de karité."
            intro="La Coordination ne se limite pas au vivrier. Chaque métier dispose de son bureau, de ses délégués régionaux et de sa mercuriale propre."
            action={{ href: "/filieres", label: "Toutes les filières" }}
            align="between"
          />

          <div className="mt-8 grid gap-px bg-paper-2/15 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s, i) => (
              <Link
                key={s.id}
                href={`/filieres/${s.slug}`}
                className="group flex flex-col bg-ink p-6 transition-colors hover:bg-paper-2"
                data-reveal
                data-reveal-delay={i * 50}
              >
                <span className="text-stamp-soft transition-colors group-hover:text-stamp">
                  <Emblem name={s.emblem} size={42} />
                </span>
                <h3 className="mt-5 font-display text-[1.2rem] leading-[1.12] font-semibold text-paper-2 transition-colors group-hover:text-ink">
                  {s.name}
                </h3>
                <p className="mt-2 flex-1 text-[0.84rem] leading-snug text-paper-2/65 transition-colors group-hover:text-mute">
                  {s.tagline}
                </p>
                <p className="num mt-5 border-t border-paper-2/20 pt-3 text-[0.76rem] tracking-wider text-paper-2/60 transition-colors group-hover:border-ink/15 group-hover:text-ink/60">
                  {s.operators} opérateurs
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 04 · ACTIVITÉS EN IMAGES ═══════════ */}
      <section id="activites" className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <Rubrique
            n="04"
            eyebrow="Les activités de la Coordination"
            title="Sur le terrain, marché après marché."
            intro="Sessions du Bureau, assises régionales, formations à l’hygiène, ateliers de filière et relevés de prix : le travail de la Coordination en images."
            action={{ href: "/actualites", label: "Les comptes rendus" }}
            align="between"
          />

          <div className="mt-8" data-reveal>
            <ActivityCarousel slides={activitySlides} />
          </div>
        </div>
      </section>

      {/* ═══════════ 05 · ACTUALITÉS ═══════════ */}
      <section className="relative bg-ink grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <Rubrique
            n="05"
            tone="paper"
            eyebrow="Dépêches · Commerce intérieur & économie"
            title="Ce que disent les marchés cette semaine."
            action={{ href: "/actualites", label: "Toutes les actualités" }}
            align="between"
          />

          <div className="mt-8 grid gap-x-12 gap-y-12 lg:grid-cols-12">
            {featuredNews && (
              <Link
                href={`/actualites/${featuredNews.slug}`}
                className="group lg:col-span-7"
                data-reveal
              >
                <Plate className="reportage" hover>
                  <img
                    src={featuredNews.image ?? "images/marche.jpg"}
                    alt={featuredNews.title}
                    className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <PlateTag>{featuredNews.category}</PlateTag>
                </Plate>
                <p className="label num mt-5 text-stamp-soft">
                  {formatDate(featuredNews.publishedAt)} · {featuredNews.place}
                </p>
                <h3 className="mt-3 font-display text-[1.75rem] leading-[1.12] font-semibold text-paper-2">
                  {featuredNews.title}
                </h3>
                <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-paper-2/75">
                  {featuredNews.excerpt}
                </p>
                <span className="label link-rule mt-5 inline-block text-paper-2/90">
                  Lire la dépêche
                </span>
              </Link>
            )}

            <div className="lg:col-span-5">
              <ul className="divide-y divide-paper-2/15 border-t border-paper-2/15">
                {news.slice(1).map((n) => (
                  <li key={n.id} data-reveal>
                    <Link href={`/actualites/${n.slug}`} className="group block py-6">
                      <div className="flex items-center gap-3">
                        <span className="label text-stamp-soft">{n.category}</span>
                        <span className="num text-[0.75rem] text-paper-2/55">
                          {formatDate(n.publishedAt)}
                        </span>
                      </div>
                      <h3 className="mt-2.5 text-[1.12rem] leading-snug font-medium text-paper-2 transition-colors group-hover:text-stamp-soft">
                        {n.title}
                      </h3>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-paper-2/65">{n.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 06 · SERVICES AUX ADHÉRENTS ═══════════ */}
      <section className="relative bg-paper-3/55">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <Rubrique
            n="06"
            eyebrow="Ce que la Coordination apporte"
            title="Six services pour les opérateurs adhérents."
            intro="Adhérer à la COCOMCI, ce n’est pas seulement figurer dans un registre : c’est disposer d’outils concrets pour exercer son métier dans des conditions loyales."
          />
          <div className="mt-8">
            <ServicesAdherents />
          </div>
        </div>
      </section>

      {/* ═══════════ 07 · BADGES & RÉSEAU ═══════════ */}
      <section className="relative bg-paper">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <Rubrique
            n="07"
            eyebrow="Annuaire officiel"
            title="Un badge, un numéro, une région."
            intro="Chaque opérateur adhérent reçoit un badge officiel portant un numéro d’agrément unique, un code régional et son secteur d’activité."
            action={{ href: "/membres", label: "Consulter l’annuaire" }}
            align="between"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {cardMembers.map((m, i) => (
              <div key={m.id} data-reveal data-reveal-delay={i * 90}>
                <OfficialBadge
                  id={`home-${m.id}`}
                  badgeNumber={m.badgeNumber}
                  name={m.fullName}
                  title={m.function}
                  region={m.region}
                  city={m.city}
                  status={m.status}
                  photo={m.photo}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-ink/15 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label text-stamp-dark">Le réseau territorial</p>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-mute">
                Comme le Bureau Exécutif National, chaque région, ville et commune dispose de son
                Coordinateur et de son Secrétaire général, titulaires d’un badge validé.
              </p>
            </div>
            <div className="flex gap-10 lg:col-span-4">
              <div>
                <p className="num font-display text-[2.1rem] leading-none font-semibold text-ink">12</p>
                <p className="label mt-2 text-mute">régions</p>
              </div>
              <div>
                <p className="num font-display text-[2.1rem] leading-none font-semibold text-ink">8</p>
                <p className="label mt-2 text-mute">villes & communes</p>
              </div>
              <div>
                <p className="num font-display text-[2.1rem] leading-none font-semibold text-valid">40</p>
                <p className="label mt-2 text-mute">badges validés</p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <Link href="/membres#reseau" className="label link-rule text-stamp-dark">
                Voir les Coordinateurs et Secrétaires généraux →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 08 · DEVISES ═══════════ */}
      <section id="devises" className="relative bg-ink grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <div className="grid gap-x-14 gap-y-11 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Rubrique
                n="08"
                tone="paper"
                eyebrow="Marché des changes"
                title="Cours des devises contre le franc CFA."
                intro="Le franc CFA de la zone UEMOA est arrimé à l’euro au taux fixe de 655,957 FCFA. Les autres cours sont indicatifs, relevés auprès des cambistes et des banques partenaires."
              />
              <Link
                href="/cotations#convertisseur"
                className="label link-rule mt-8 inline-block text-stamp-soft"
              >
                Ouvrir le convertisseur FCFA →
              </Link>
            </div>

            <div className="lg:col-span-7">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-paper-2/40">
                    <th className="label pb-3 text-paper-2/60">Devise</th>
                    <th className="label pb-3 text-paper-2/60">Libellé</th>
                    <th className="label pb-3 text-right text-paper-2/60">Cours en FCFA</th>
                    <th className="label pb-3 text-right text-paper-2/60">Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {devises.map((d) => (
                    <tr key={d.id} className="border-b border-paper-2/15" data-reveal>
                      <td className="py-4 pr-4">
                        <span className="font-display text-[1.2rem] font-semibold text-paper-2">
                          {d.code}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-[0.92rem] text-paper-2/70">{d.name}</td>
                      <td className="num py-4 text-right text-[1.1rem] font-semibold text-paper-2">
                        {formatRate(d.rate)}
                      </td>
                      <td className="py-4 text-right">
                        <Trend value={d.changePct} align="right" onDark />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="label mt-5 text-paper-2/50">
                Relevé du 12 février 2026 à 12h30 · Cours indicatifs, ne constituant pas une offre
                de change
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 09 · PARTENAIRES ═══════════ */}
      <section id="partenaires" className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 pt-16 pb-6">
          <Rubrique
            n="09"
            eyebrow="Ils travaillent avec la Coordination"
            title="Partenaires institutionnels, publics et privés."
            intro="La COCOMCI siège aux côtés des tutelles, des établissements publics et des organisations professionnelles. Ces concertations fondent la crédibilité de nos mercuriales."
          />
        </div>

        <PartnersMarquee partners={partners} />

        <div className="relative mx-auto max-w-[1240px] px-5 pt-10 pb-16">
          <PartnersGrid partners={partners} />
        </div>
      </section>

      {/* ═══════════ 10 · NOUS ÉCRIRE ═══════════ */}
      <section id="ecrire" className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <Rubrique
            n="10"
            eyebrow="Nous écrire"
            title="Une question, un signalement, une adhésion ?"
            intro="Le secrétariat du Bureau Exécutif National traite chaque message sous trois jours ouvrés. Pour une urgence de marché, préférez le téléphone."
          />

          <div className="mt-9 grid gap-x-12 gap-y-10 lg:grid-cols-3">
            {/* Deux tiers : le formulaire */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Un tiers : les voies directes */}
            <aside className="lg:col-span-1">
              <div className="border border-ink/20 bg-paper-2 p-6">
                <p className="label text-stamp-dark">Joindre directement</p>

                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="label text-mute">Secrétariat général</dt>
                    <dd className="num mt-1.5 text-[1.05rem] font-semibold text-ink">
                      <a href="tel:+2252720314862" className="hover:text-stamp-dark">
                        +225 27 20 31 48 62
                      </a>
                    </dd>
                    <dd className="mt-1 text-[0.82rem] text-mute">Lundi – vendredi, 8h – 17h</dd>
                  </div>

                  <div className="border-t border-ink/12 pt-5">
                    <dt className="label text-mute">Courriel</dt>
                    <dd className="mt-1.5 text-[0.95rem] text-ink">
                      <a href="mailto:contact@cocomci.ci" className="link-rule hover:text-stamp-dark">
                        contact@cocomci.ci
                      </a>
                    </dd>
                  </div>

                  <div className="border-t border-ink/12 pt-5">
                    <dt className="label text-mute">Siège</dt>
                    <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-ink/85">
                      Immeuble Alpha 2000, 4ᵉ étage
                      <br />
                      Rue du Commerce, Plateau
                      <br />
                      01 BP 4412 Abidjan 01
                    </dd>
                  </div>

                  <div className="border-t border-ink/12 pt-5">
                    <dt className="label text-mute">Responsables territoriaux</dt>
                    <dd className="mt-2 text-[0.88rem] leading-relaxed text-mute">
                      Pour une question locale, contactez le coordinateur de votre région.
                    </dd>
                    <dd className="mt-3">
                      <Link href="/membres#contacts" className="label link-rule text-stamp-dark">
                        Annuaire téléphonique →
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 border-l-2 border-stamp bg-stamp/8 px-5 py-4">
                <p className="label text-stamp-dark">Signalement urgent</p>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/85">
                  Rupture d’approvisionnement, pratique abusive, fermeture de marché : appelez le
                  secrétariat plutôt que d’écrire.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════ ADHÉSION ═══════════ */}
      <section className="relative overflow-hidden bg-stamp text-paper-2">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 px-5 py-16">
          <div>
            <p className="label text-paper-2/80">Adhésion & renouvellement</p>
            <p className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.2vw,2.7rem)] leading-[1.08] font-semibold">
              Vous exercez dans le commerce intérieur ?
              <br />
              Rejoignez la Coordination.
            </p>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-paper-2/85">
              Le renouvellement des badges est ouvert auprès des secrétariats régionaux jusqu’au
              31 mars 2026.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/membres"
              className="label inline-flex items-center gap-2 bg-paper-2 px-6 py-4 text-stamp-dark transition-colors hover:bg-ink hover:text-paper-2"
            >
              Rejoindre la COCOMCI
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/#contact"
              className="label inline-flex items-center gap-2 border border-paper-2/70 px-6 py-4 transition-colors hover:bg-paper-2 hover:text-stamp-dark"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
