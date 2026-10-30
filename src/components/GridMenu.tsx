"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Menu en damier : un bouton à quatre carrés ouvre un panneau plein écran
 * présentant toutes les rubriques du portail.
 *
 * Accessibilité : fermeture par Échap, verrouillage du défilement, retour du
 * focus sur le bouton, navigation au clavier dans le panneau.
 */

type Entree = {
  href: string;
  titre: string;
  texte: string;
  numero: string;
};

const RUBRIQUES: Entree[] = [
  {
    numero: "01",
    href: "/",
    titre: "Accueil",
    texte: "Mercuriale du jour, dépêches et activités de la Coordination.",
  },
  {
    numero: "02",
    href: "/#presidence",
    titre: "Le mot du Président",
    texte: "L’éditorial de KAMAGATÉ Lamine et la composition du Bureau Exécutif National.",
  },
  {
    numero: "03",
    href: "/cotations",
    titre: "Cours & mercuriale",
    texte: "Vingt-huit produits relevés sur huit marchés, et le convertisseur FCFA.",
  },
  {
    numero: "04",
    href: "/filieres",
    titre: "Les filières",
    texte: "Huit métiers organisés, du vivrier à la quincaillerie, avec leurs bureaux.",
  },
  {
    numero: "05",
    href: "/membres",
    titre: "Membres & badges",
    texte: "Annuaire des opérateurs, trombinoscope et badges officiels.",
  },
  {
    numero: "06",
    href: "/membres#reseau",
    titre: "Réseau territorial",
    texte: "Coordinateurs et secrétaires généraux des régions, villes et communes.",
  },
  {
    numero: "07",
    href: "/actualites",
    titre: "Actualités",
    texte: "Dépêches du commerce intérieur, notes de conjoncture et comptes rendus.",
  },
  {
    numero: "08",
    href: "/actualites#activites",
    titre: "Activités en images",
    texte: "Le reportage photographique des assises, formations et missions.",
  },
  {
    numero: "09",
    href: "/cotations#devises",
    titre: "Cours des devises",
    texte: "Euro, dollar, naira et cédi face au franc CFA de la zone UEMOA.",
  },
  {
    numero: "10",
    href: "/membres#contacts",
    titre: "Annuaire téléphonique",
    texte: "Téléphone et WhatsApp des responsables territoriaux.",
  },
  {
    numero: "11",
    href: "/#partenaires",
    titre: "Nos partenaires",
    texte: "Tutelles, établissements publics et organisations professionnelles.",
  },
  {
    numero: "12",
    href: "/#ecrire",
    titre: "Nous écrire",
    texte: "Formulaire de contact, téléphone du secrétariat et adresse du siège.",
  },
  {
    numero: "13",
    href: "/administration",
    titre: "Administration",
    texte: "Espace réservé : logo, portraits des membres et bibliothèque d’images.",
  },
];

/** Pictogramme à quatre carrés — ouvert, il devient une croix. */
function DamierIcone({ ouvert }: { ouvert: boolean }) {
  const carres = [
    { x: 2, y: 2 },
    { x: 11, y: 2 },
    { x: 2, y: 11 },
    { x: 11, y: 11 },
  ];
  return (
    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
      {carres.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width="7"
          height="7"
          fill="currentColor"
          style={{
            transformOrigin: "10px 10px",
            transform: ouvert ? "rotate(45deg) scale(0.82)" : "none",
            transition: "transform .4s cubic-bezier(.22,1,.36,1)",
            transitionDelay: `${i * 35}ms`,
          }}
        />
      ))}
    </svg>
  );
}

export function GridMenu() {
  const [ouvert, setOuvert] = useState(false);
  const bouton = useRef<HTMLButtonElement>(null);
  const panneau = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;

    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOuvert(false);
        bouton.current?.focus();
      }
    };

    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", surTouche);

    // Le premier lien reçoit le focus : navigation au clavier immédiate.
    panneau.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = defilement;
      document.removeEventListener("keydown", surTouche);
    };
  }, [ouvert]);

  return (
    <>
      <button
        ref={bouton}
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        aria-haspopup="dialog"
        aria-label={ouvert ? "Fermer le sommaire" : "Ouvrir le sommaire du portail"}
        title="Sommaire du portail"
        className="group relative flex shrink-0 items-center gap-2.5 border-r border-paper-2/20 bg-stamp px-4 text-paper-2 transition-colors hover:bg-stamp-dark sm:px-5"
      >
        <DamierIcone ouvert={ouvert} />
        <span className="label hidden sm:inline">Sommaire</span>

        {/* Pastille de rappel : attire l'œil vers le carré au premier chargement */}
        {!ouvert && (
          <span
            aria-hidden="true"
            className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-paper-2/80 sm:hidden"
          />
        )}
      </button>

      {/* Panneau */}
      <div
        className={`fixed inset-0 z-[70] ${ouvert ? "" : "pointer-events-none"}`}
        aria-hidden={!ouvert}
      >
        {/* Voile */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Fermer le sommaire"
          onClick={() => setOuvert(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-[2px] transition-opacity duration-400"
          style={{ opacity: ouvert ? 1 : 0 }}
        />

        <div
          ref={panneau}
          role="dialog"
          aria-modal="true"
          aria-label="Sommaire du portail"
          className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-paper shadow-2xl transition-transform duration-500"
          style={{
            transform: ouvert ? "translateY(0)" : "translateY(-101%)",
            transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div className="mx-auto max-w-[1240px] px-5 py-8">
            {/* Tête du panneau */}
            <div className="flex items-start justify-between gap-6 border-b-2 border-ink pb-5">
              <div>
                <p className="label text-stamp-dark">Sommaire du portail</p>
                <p className="mt-2.5 font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-none font-semibold text-ink">
                  Coordination des Opérateurs
                  <br />
                  de Commerce de Côte d’Ivoire
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOuvert(false);
                  bouton.current?.focus();
                }}
                className="label inline-flex shrink-0 items-center gap-2 border border-ink/30 px-4 py-3 text-ink transition-colors hover:bg-ink hover:text-paper-2"
              >
                Fermer
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            {/* Damier des rubriques */}
            <ul className="mt-8 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {RUBRIQUES.map((r, i) => (
                <li key={r.href + r.numero}>
                  <Link
                    href={r.href}
                    onClick={() => setOuvert(false)}
                    className="group flex h-full flex-col bg-paper px-5 py-6 transition-colors hover:bg-ink"
                    style={{
                      opacity: ouvert ? 1 : 0,
                      transform: ouvert ? "none" : "translateY(10px)",
                      transition: `opacity .45s ease ${i * 28 + 120}ms, transform .45s cubic-bezier(.22,1,.36,1) ${i * 28 + 120}ms, background-color .2s`,
                    }}
                  >
                    <span className="flex items-baseline justify-between">
                      <span className="num font-display text-[0.95rem] font-semibold text-stamp">
                        {r.numero}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-ink/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-stamp-soft"
                      >
                        →
                      </span>
                    </span>
                    <span className="mt-3 block font-display text-[1.18rem] leading-tight font-semibold text-ink transition-colors group-hover:text-paper-2">
                      {r.titre}
                    </span>
                    <span className="mt-2 block text-[0.83rem] leading-snug text-mute transition-colors group-hover:text-paper-2/70">
                      {r.texte}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="label mt-7 text-mute/70">
              Appuyez sur Échap pour fermer · Bulletin n° 214, 12 février 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
