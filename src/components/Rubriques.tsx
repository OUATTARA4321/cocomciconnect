import Link from "next/link";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
   Titres de rubrique numérotés, à la manière d'un sommaire
   de bulletin imprimé.
   ───────────────────────────────────────────────────────────── */

export function Rubrique({
  n,
  eyebrow,
  title,
  intro,
  action,
  tone = "ink",
  align = "left",
}: {
  n: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { href: string; label: string };
  tone?: "ink" | "paper";
  align?: "left" | "between";
}) {
  const dark = tone === "paper";

  return (
    <header className={dark ? "text-paper-2" : "text-ink"}>
      {/* Filet de tête : numéro + rubrique */}
      <div
        className={`flex items-center gap-4 border-t-2 pt-4 ${
          dark ? "border-paper-2/35" : "border-ink"
        }`}
      >
        <span
          className={`num font-display text-[1.05rem] leading-none font-semibold ${
            dark ? "text-stamp-soft" : "text-stamp"
          }`}
        >
          {n}
        </span>
        <span className={`label ${dark ? "text-paper-2/70" : "text-ink/60"}`}>{eyebrow}</span>
        <span
          aria-hidden="true"
          className={`ml-auto hidden h-px flex-1 sm:block ${
            dark ? "bg-paper-2/20" : "bg-ink/15"
          }`}
        />
      </div>

      <div
        className={`mt-4 ${
          align === "between"
            ? "flex flex-wrap items-end justify-between gap-x-10 gap-y-5"
            : ""
        }`}
      >
        <div className="max-w-3xl">
          <h2
            className={`font-display text-[clamp(1.95rem,3.9vw,3.2rem)] leading-[1] font-semibold tracking-[-0.018em] ${
              dark ? "text-paper-2" : "text-ink"
            }`}
          >
            {title}
          </h2>
          {intro && (
            <p
              className={`mt-3.5 max-w-2xl text-[1.04rem] leading-relaxed ${
                dark ? "text-paper-2/75" : "text-mute"
              }`}
            >
              {intro}
            </p>
          )}
        </div>

        {action && (
          <Link
            href={action.href}
            className={`label inline-flex shrink-0 items-center gap-2 border px-5 py-3.5 transition-colors ${
              dark
                ? "border-paper-2/40 text-paper-2 hover:bg-paper-2 hover:text-ink"
                : "border-ink/30 text-ink hover:bg-ink hover:text-paper-2"
            }`}
          >
            {action.label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   Accès rapides : les quatre gestes les plus fréquents.
   ───────────────────────────────────────────────────────────── */

const ACCES = [
  {
    href: "/cotations",
    title: "Consulter les cours",
    text: "Prix du jour sur les marchés de gros : vivriers, céréales, denrées de base.",
    icon: (
      <>
        <path d="M6 30V18M16 30V10M26 30V22M36 30V14" strokeWidth="3" strokeLinecap="round" />
        <path d="M4 36h36" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "/membres",
    title: "Vérifier un badge",
    text: "Contrôler l’agrément d’un opérateur par son numéro, sa région ou son nom.",
    icon: (
      <>
        <rect x="7" y="9" width="30" height="26" rx="3" strokeWidth="2.6" />
        <circle cx="17" cy="19" r="4.5" strokeWidth="2.4" />
        <path d="M10 31c1.8-3.6 4.2-5.4 7-5.4s5.2 1.8 7 5.4" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M27 17h6M27 23h6" strokeWidth="2.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "/membres#contacts",
    title: "Joindre un responsable",
    text: "Téléphone et WhatsApp des coordinateurs et secrétaires généraux.",
    icon: (
      <>
        <path
          d="M12 8h6l3 8-4 2.5a18 18 0 0 0 8.5 8.5L28 23l8 3v6a3 3 0 0 1-3 3A26 26 0 0 1 9 11a3 3 0 0 1 3-3Z"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    href: "/filieres",
    title: "Découvrir les filières",
    text: "Huit métiers organisés, du vivrier à la quincaillerie, avec leurs mercuriales.",
    icon: (
      <>
        <rect x="6" y="6" width="13" height="13" rx="2" strokeWidth="2.6" />
        <rect x="24" y="6" width="13" height="13" rx="2" strokeWidth="2.6" />
        <rect x="6" y="24" width="13" height="13" rx="2" strokeWidth="2.6" />
        <rect x="24" y="24" width="13" height="13" rx="2" strokeWidth="2.6" />
      </>
    ),
  },
];

export function AccesRapides() {
  return (
    <section className="border-b border-ink/15 bg-paper-3/55">
      <div className="mx-auto max-w-[1240px] px-5">
        <ul className="grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {ACCES.map((a, i) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className="group flex h-full flex-col bg-paper-3/55 px-6 py-7 transition-colors hover:bg-ink"
                data-reveal
                data-reveal-delay={i * 70}
              >
                <span className="flex items-center justify-between">
                  <svg
                    viewBox="0 0 44 44"
                    width="34"
                    height="34"
                    fill="none"
                    stroke="currentColor"
                    className="text-ink transition-colors group-hover:text-stamp-soft"
                    aria-hidden="true"
                  >
                    {a.icon}
                  </svg>
                  <span
                    aria-hidden="true"
                    className="text-[1.1rem] text-ink/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-stamp-soft"
                  >
                    →
                  </span>
                </span>

                <h3 className="mt-5 font-display text-[1.18rem] leading-tight font-semibold text-ink transition-colors group-hover:text-paper-2">
                  {a.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-snug text-mute transition-colors group-hover:text-paper-2/70">
                  {a.text}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services aux adhérents : ce que la Coordination apporte.
   ───────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    n: "I",
    title: "Le badge officiel",
    text: "Une carte d’opérateur à numéro d’agrément unique, exigible lors des contrôles sur l’ensemble des marchés du pays.",
  },
  {
    n: "II",
    title: "Le bulletin des cours",
    text: "Les prix de gros relevés chaque matin par les sections régionales, consolidés au siège et diffusés aux adhérents.",
  },
  {
    n: "III",
    title: "La formation",
    text: "Hygiène des étals, chaîne du froid, tenue des registres : des sessions pratiques organisées dans les régions.",
  },
  {
    n: "IV",
    title: "Le fonds de solidarité",
    text: "Une aide aux sinistres d’étal et à la scolarité des enfants d’adhérents, alimentée par les cotisations.",
  },
  {
    n: "V",
    title: "La représentation",
    text: "Le portage des intérêts des opérateurs auprès des pouvoirs publics et des commissions de prix.",
  },
  {
    n: "VI",
    title: "Les assises régionales",
    text: "Deux rencontres annuelles par région, pour arrêter les positions communes de la profession.",
  },
];

export function ServicesAdherents() {
  return (
    <ul className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => (
        <li
          key={s.n}
          className="group bg-paper-2 px-6 py-7 transition-colors hover:bg-paper-3/70"
          data-reveal
          data-reveal-delay={i * 50}
        >
          <p className="num font-display text-[1.4rem] leading-none font-semibold text-stamp">
            {s.n}
          </p>
          <h3 className="mt-4 font-display text-[1.2rem] leading-tight font-semibold text-ink">
            {s.title}
          </h3>
          <p className="mt-2.5 text-[0.92rem] leading-relaxed text-mute">{s.text}</p>
        </li>
      ))}
    </ul>
  );
}
