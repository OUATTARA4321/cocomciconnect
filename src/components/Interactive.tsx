"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ContactRow, WhatsAppIcon } from "@/components/Contact";
import { OfficialBadge } from "@/components/Seal";
import { Trend } from "@/components/Bits";
import { formatDate, formatFcfa, formatRate, variation } from "@/lib/format";

export type CommodityRow = {
  id: number;
  name: string;
  category: string;
  unit: string;
  market: string;
  city: string;
  price: number;
  previousPrice: number;
  trend: string;
};

export type CurrencyRow = {
  id: number;
  code: string;
  name: string;
  rate: number;
  changePct: number;
  note: string;
};

export type MemberRow = {
  id: number;
  badgeNumber: string;
  fullName: string;
  function: string;
  region: string;
  city: string;
  sector: string;
  status: string;
  memberSince: number;
  isBne: boolean;
  photo: string | null;
};

export type NewsRow = {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  place: string;
  source: string;
  image: string | null;
  publishedAt: string;
};

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label border px-3.5 py-2.5 transition-colors ${
        active
          ? "border-ink bg-ink text-paper-2"
          : "border-ink/25 text-ink/70 hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label block text-mute">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const selectClass =
  "w-full border border-ink/25 bg-paper-2 px-3 py-2.5 text-[0.88rem] text-ink focus:border-stamp";
const inputClass =
  "w-full border border-ink/25 bg-paper-2 px-3 py-2.5 text-[0.88rem] text-ink placeholder:text-ink/35 focus:border-stamp";

/* ——————————————————— TABLE DES COTATIONS ——————————————————— */

export function CotationsBoard({ rows }: { rows: CommodityRow[] }) {
  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(rows.map((r) => r.category)))],
    [rows],
  );
  const markets = useMemo(
    () => ["Tous les marchés", ...Array.from(new Set(rows.map((r) => r.market)))],
    [rows],
  );

  const [category, setCategory] = useState("Tous");
  const [market, setMarket] = useState("Tous les marchés");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("categorie");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = rows.filter(
      (r) =>
        (category === "Tous" || r.category === category) &&
        (market === "Tous les marchés" || r.market === market) &&
        (q === "" ||
          r.name.toLowerCase().includes(q) ||
          r.market.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q)),
    );
    if (sort === "prix") return [...out].sort((a, b) => b.price - a.price);
    if (sort === "variation")
      return [...out].sort(
        (a, b) =>
          variation(b.price, b.previousPrice) - variation(a.price, a.previousPrice),
      );
    return out;
  }, [rows, category, market, query, sort]);

  const groups = useMemo(() => {
    if (sort !== "categorie") return [{ category: `${filtered.length} produits`, items: filtered }];
    const map = new Map<string, CommodityRow[]>();
    filtered.forEach((r) => {
      const list = map.get(r.category) ?? [];
      list.push(r);
      map.set(r.category, list);
    });
    return Array.from(map.entries()).map(([c, items]) => ({ category: c, items }));
  }, [filtered, sort]);

  return (
    <div>
      {/* Rail de filtres */}
      <div className="relative z-30 -mx-5 border-y border-ink/15 bg-paper-2/97 px-5 py-4 backdrop-blur-sm lg:sticky lg:top-[42px]">
        <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
          <div className="min-w-[15rem] flex-1">
            <Field label="Rechercher un produit, un marché">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="riz, tomate, Adjamé…"
                className={inputClass}
              />
            </Field>
          </div>
          <div className="min-w-[13rem]">
            <Field label="Marché">
              <select value={market} onChange={(e) => setMarket(e.target.value)} className={selectClass}>
                {markets.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="min-w-[11rem]">
            <Field label="Trier par">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
                <option value="categorie">Catégorie</option>
                <option value="prix">Prix décroissant</option>
                <option value="variation">Variation</option>
              </select>
            </Field>
          </div>
          <div className="num label ml-auto pb-3 text-mute">
            {filtered.length} / {rows.length} produits
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 border border-dashed border-ink/25 px-6 py-16 text-center">
          <p className="font-display text-2xl font-semibold text-ink">
            Aucun produit ne correspond à cette recherche.
          </p>
          <p className="mt-3 text-mute">
            Essayez un autre marché, une autre catégorie, ou consultez la liste complète des
            produits cotés.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("Tous");
              setMarket("Tous les marchés");
            }}
            className="label mt-6 inline-block border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-paper-2"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.category} className="mt-12 first:mt-10">
            <div className="rule-heavy flex items-baseline justify-between gap-4 pt-4">
              <h3 className="font-display text-[1.45rem] font-semibold text-ink">{group.category}</h3>
              <span className="label num text-mute">
                {group.items.length} produit{group.items.length > 1 ? "s" : ""} coté
                {group.items.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="ledger w-full min-w-[820px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink/25">
                    <th className="label py-3 pr-4 text-ink/65">Produit</th>
                    <th className="label py-3 pr-4 text-ink/65">Unité</th>
                    <th className="label py-3 pr-4 text-ink/65">Marché de relevé</th>
                    <th className="label py-3 pr-4 text-right text-ink/65">Cours (FCFA)</th>
                    <th className="label py-3 pr-4 text-right text-ink/65">Veille</th>
                    <th className="label py-3 pr-4 text-right text-ink/65">Variation</th>
                    <th className="label py-3 text-right text-ink/65">Tendance</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((r) => {
                    const pct = variation(r.price, r.previousPrice);
                    const bar = Math.min(100, Math.abs(pct) * 8);
                    return (
                      <tr key={r.id}>
                        <td className="py-3.5 pr-4 font-medium text-ink">{r.name}</td>
                        <td className="py-3.5 pr-4 text-[0.85rem] text-mute">{r.unit}</td>
                        <td className="py-3.5 pr-4 text-[0.85rem] text-mute">
                          {r.market}
                          <span className="ml-1.5 text-ink/45">{r.city}</span>
                        </td>
                        <td className="num py-3.5 pr-4 text-right text-[1.05rem] font-semibold text-ink">
                          {formatFcfa(r.price)}
                        </td>
                        <td className="num py-3.5 pr-4 text-right text-[0.86rem] text-mute">
                          {formatFcfa(r.previousPrice)}
                        </td>
                        <td className="py-3.5 pr-4 text-right">
                          <Trend value={pct} align="right" />
                        </td>
                        <td className="py-3.5">
                          <span className="flex justify-end">
                            <span
                              className="h-[6px]"
                              style={{
                                width: `${Math.max(4, bar)}px`,
                                backgroundColor:
                                  pct > 0.001
                                    ? "var(--color-stamp)"
                                    : pct < -0.001
                                      ? "var(--color-valid)"
                                      : "var(--color-mute)",
                                opacity: 0.7,
                              }}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}
    </div>
  );
}

/* ——————————————————— CONVERTISSEUR DE DEVISES ——————————————————— */

export function CurrencyBoard({
  rows,
  initialAmount = 25000,
  initialCode = "USD",
}: {
  rows: CurrencyRow[];
  initialAmount?: number;
  initialCode?: string;
}) {
  const [amount, setAmount] = useState(String(initialAmount));
  const [code, setCode] = useState(initialCode);

  const numeric = Number(amount.replace(",", ".")) || 0;
  const selected = rows.find((r) => r.code === code) ?? rows[0];
  const converted = selected ? numeric / selected.rate : 0;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="ledger w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink">
              <th className="label py-3 pr-4 text-ink/65">Code</th>
              <th className="label py-3 pr-4 text-ink/65">Devise</th>
              <th className="label py-3 pr-4 text-right text-ink/65">Cours en FCFA</th>
              <th className="label py-3 pr-4 text-right text-ink/65">Variation</th>
              <th className="label py-3 text-ink/65">Observation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="py-3.5 pr-4">
                  <span className="font-display text-[1.12rem] font-semibold text-ink">{r.code}</span>
                </td>
                <td className="py-3.5 pr-4 text-[0.92rem] text-mute">{r.name}</td>
                <td className="num py-3.5 pr-4 text-right text-[1.06rem] font-semibold text-ink">
                  {formatRate(r.rate)}
                </td>
                <td className="py-3.5 pr-4 text-right">
                  <Trend value={r.changePct} align="right" />
                </td>
                <td className="py-3.5 text-[0.82rem] text-mute">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        id="convertisseur"
        className="mt-12 grid gap-x-12 gap-y-8 border-t-2 border-ink pt-8 lg:grid-cols-2"
      >
        <div>
          <p className="label text-stamp-dark">Convertisseur indicatif</p>
          <h3 className="mt-3 font-display text-[1.75rem] leading-tight font-semibold text-ink">
            Combien vaut mon montant en devises ?
          </h3>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-mute">
            Les taux appliqués sont ceux du tableau ci-dessus, relevés le 12 février 2026. Ils ne
            constituent pas une offre de change : rapprochez-vous de votre banque ou de votre
            cambiste avant toute transaction.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Montant en FCFA">
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`${inputClass} num text-[1.05rem]`}
              />
            </Field>
            <Field label="Devise">
              <select
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`${selectClass} num`}
              >
                {rows
                  .filter((r) => r.code !== "XOF")
                  .map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.code} — {r.name}
                    </option>
                  ))}
              </select>
            </Field>
          </div>
        </div>

        <div className="bg-ink px-7 py-8 text-paper-2">
          <p className="label text-stamp-soft">Résultat de la conversion</p>
          <p className="num mt-5 font-display text-[clamp(2.1rem,5vw,3.1rem)] leading-none font-semibold">
            {formatRate(converted)}{" "}
            <span className="text-[1.15rem] font-normal text-paper-2/70">{selected?.code}</span>
          </p>
          <p className="num mt-3 text-[0.95rem] text-paper-2/75">
            pour {formatFcfa(numeric)} FCFA
          </p>
          <div className="mt-8 space-y-3 border-t border-paper-2/20 pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-paper-2/60">Sens inverse</span>
              <span className="num text-[1.05rem] text-paper-2">
                {formatFcfa(converted * (selected?.rate ?? 1))} FCFA
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-paper-2/60">Taux appliqué</span>
              <span className="num text-[1.05rem] text-paper-2">
                1 {selected?.code} = {formatRate(selected?.rate ?? 1)} FCFA
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-paper-2/60">Variation hebdomadaire</span>
              <span className="num text-[1.05rem]">
                <Trend value={selected?.changePct ?? 0} onDark />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——————————————————— ANNUAIRE DES MEMBRES ——————————————————— */

export function MembersDirectory({ rows }: { rows: MemberRow[] }) {
  const regions = useMemo(() => ["Toutes", ...Array.from(new Set(rows.map((r) => r.region)))], [rows]);
  const cities = useMemo(() => ["Toutes", ...Array.from(new Set(rows.map((r) => r.city)))], [rows]);
  const sectors = useMemo(() => ["Tous", ...Array.from(new Set(rows.map((r) => r.sector)))], [rows]);

  const [region, setRegion] = useState("Toutes");
  const [city, setCity] = useState("Toutes");
  const [sector, setSector] = useState("Tous");
  const [query, setQuery] = useState("");

  const filtered = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    return (
      (region === "Toutes" || r.region === region) &&
      (city === "Toutes" || r.city === city) &&
      (sector === "Tous" || r.sector === sector) &&
      (q === "" ||
        r.fullName.toLowerCase().includes(q) ||
        r.badgeNumber.toLowerCase().includes(q) ||
        r.function.toLowerCase().includes(q))
    );
  });

  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
      {/* Rail latéral collant : les filtres */}
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <div className="rule-heavy pt-4">
            <p className="label text-stamp-dark">Filtrer l’annuaire</p>
          </div>
          <div className="mt-6 space-y-5">
            <Field label="Nom, badge ou fonction">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="COC-ABJ…"
                className={inputClass}
              />
            </Field>
            <Field label="Région">
              <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
                {regions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label="Ville">
              <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Secteur">
              <select value={sector} onChange={(e) => setSector(e.target.value)} className={selectClass}>
                {sectors.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-8 border border-ink/15 bg-paper-2 p-5">
            <p className="num font-display text-[2.4rem] leading-none font-semibold text-ink">
              {filtered.length}
            </p>
            <p className="mt-2 text-[0.85rem] leading-snug text-mute">
              opérateur{filtered.length > 1 ? "s" : ""} affiché
              {filtered.length > 1 ? "s" : ""} sur cet extrait de l’annuaire national.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setRegion("Toutes");
                setCity("Toutes");
                setSector("Tous");
              }}
              className="label link-rule mt-4 inline-block text-stamp-dark"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-9">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-ink/25 px-6 py-20 text-center">
            <p className="font-display text-2xl font-semibold text-ink">
              Aucun adhérent ne correspond à ces critères.
            </p>
            <p className="mt-3 text-mute">
              Élargissez la région ou recherchez directement un numéro de badge.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((m) => (
              <div key={m.id} data-reveal>
                <OfficialBadge
                  id={`dir-${m.id}`}
                  badgeNumber={m.badgeNumber}
                  name={m.fullName}
                  title={m.function}
                  region={m.region}
                  city={m.city}
                  status={m.status}
                  photo={m.photo}
                />
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <span className="label text-mute">{m.sector}</span>
                  <span className="num text-[0.72rem] tracking-wider text-ink/50">
                    Adhérent depuis {m.memberSince}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ——————————————————— FILTRE DES ACTUALITÉS ——————————————————— */

export function NewsFilter({ rows, categories }: { rows: NewsRow[]; categories: string[] }) {
  const [category, setCategory] = useState("Toutes");
  const filtered = rows.filter((n) => category === "Toutes" || n.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-y border-ink/15 py-4">
        {["Toutes", ...categories].map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </Chip>
        ))}
        <span className="num label ml-auto self-center text-mute">
          {filtered.length} dépêche{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-10 grid gap-x-12 gap-y-12 lg:grid-cols-2">
        {filtered.map((n) => (
          <article key={n.id} data-reveal className="group">
            <Link href={`/actualites/${n.slug}`}>
              <figure className="relative overflow-hidden">
                {n.image ? (
                  <img
                    src={n.image}
                    alt={n.title}
                    className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-[260px] w-full items-center justify-center bg-ink text-paper-2">
                    <span className="label text-paper-2/70">COCOMCI · Communiqué</span>
                  </div>
                )}
                <figcaption className="label absolute top-0 left-0 z-30 border-b-2 border-stamp bg-ink/55 px-3.5 py-2 text-paper-2 backdrop-blur-md">
                  {n.category}
                </figcaption>
              </figure>
              <p className="label num mt-5 text-mute">
                {formatDate(n.publishedAt)} · {n.place}
              </p>
              <h2 className="mt-3 font-display text-[1.55rem] leading-[1.14] font-semibold text-ink">
                {n.title}
              </h2>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-mute">{n.excerpt}</p>
              <span className="label link-rule mt-4 inline-block text-stamp-dark">
                Lire la dépêche
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ——————————————————— RÉSEAU TERRITORIAL ——————————————————— */

export type OfficerRow = {
  id: number;
  badgeNumber: string;
  fullName: string;
  role: string;
  level: string;
  scope: string;
  region: string;
  city: string;
  phone: string;
  status: string;
  validatedAt: string;
  officerSince: number;
  photo: string | null;
  whatsapp: string | null;
  email: string | null;
};

export function OfficersDirectory({ rows }: { rows: OfficerRow[] }) {
  const levels = ["Tous", "Région", "Ville", "Commune"];
  const roles = ["Tous", "Coordinateur", "Secrétaire général"];

  const [level, setLevel] = useState("Tous");
  const [role, setRole] = useState("Tous");
  const [query, setQuery] = useState("");
  const [waOnly, setWaOnly] = useState(false);

  const filtered = rows.filter((o) => {
    const q = query.trim().toLowerCase();
    return (
      (level === "Tous" || o.level === level) &&
      (role === "Tous" || o.role.startsWith(role)) &&
      (!waOnly || Boolean(o.whatsapp)) &&
      (q === "" ||
        o.fullName.toLowerCase().includes(q) ||
        o.scope.toLowerCase().includes(q) ||
        o.region.toLowerCase().includes(q) ||
        o.badgeNumber.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <div className="border-y border-ink/15 py-5">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
          <div className="min-w-[16rem] flex-1">
            <Field label="Nom, échelon ou numéro de badge">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Korhogo, Coordinateur, COC-SAV…"
                className={inputClass}
              />
            </Field>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label mr-1 text-mute">Échelon</span>
            {levels.map((l) => (
              <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                {l}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label mr-1 text-mute">Fonction</span>
            {roles.map((r) => (
              <Chip key={r} active={role === r} onClick={() => setRole(r)}>
                {r}
              </Chip>
            ))}
          </div>
          <label className="flex cursor-pointer items-center gap-2 pb-3">
            <input
              type="checkbox"
              checked={waOnly}
              onChange={(e) => setWaOnly(e.target.checked)}
              className="h-4 w-4 accent-[#1F8A4C]"
            />
            <span className="label inline-flex items-center gap-1.5 text-ink/75">
              <WhatsAppIcon size={13} className="text-[#1F8A4C]" />
              Joignables sur WhatsApp
            </span>
          </label>

          <div className="num label ml-auto pb-3 text-mute">
            {filtered.length} / {rows.length} mandats
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 border border-dashed border-ink/25 px-6 py-16 text-center">
          <p className="font-display text-2xl font-semibold text-ink">
            Aucun mandat ne correspond à cette recherche.
          </p>
          <p className="mt-3 text-mute">
            Essayez un autre échelon, une autre fonction, ou consultez la liste complète du réseau
            territorial.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLevel("Tous");
              setRole("Tous");
              setWaOnly(false);
            }}
            className="label mt-6 inline-block border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-paper-2"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((o) => (
            <div key={o.id} data-reveal>
              <OfficialBadge
                id={`off-${o.id}`}
                badgeNumber={o.badgeNumber}
                name={o.fullName}
                title={o.role}
                region={o.level}
                city={o.scope}
                status={o.status}
                photo={o.photo}
              />
              <div className="border-x border-b border-ink/25 bg-paper-2 px-3 py-2.5">
                <ContactRow
                  name={o.fullName}
                  role={o.role}
                  phone={o.phone}
                  whatsapp={o.whatsapp}
                  email={o.email}
                  compact
                />
                <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-ink/10 pt-2">
                  <span className="num text-[0.7rem] tracking-wider text-ink/55">
                    Validé le{" "}
                    {new Date(o.validatedAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <span className="num text-[0.7rem] tracking-wider text-ink/55">
                    En fonction depuis {o.officerSince}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
