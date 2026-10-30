"use client";

import { useEffect, useState } from "react";

/**
 * Bandeau de version préliminaire.
 *
 * Affiché tant que la variable d'environnement NEXT_PUBLIC_PREVIEW vaut "1".
 * À la mise en ligne définitive, il suffit de retirer cette variable :
 * le bandeau disparaît sans toucher au code.
 *
 * Le visiteur peut le replier ; le choix est conservé le temps de sa visite.
 */
export function PreviewNotice() {
  // Visible dès le rendu serveur : l'avertissement doit s'afficher même si
  // le JavaScript est lent ou désactivé. Il n'est replié qu'après coup,
  // si le visiteur l'a déjà masqué pendant sa visite.
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("cocomci-preview-hidden") === "1") setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div className="relative z-[60] border-b-2 border-stamp bg-stamp/12">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-5 gap-y-2 px-5 py-2.5">
        <span className="label shrink-0 bg-stamp px-2 py-1 text-paper-2">
          Version préliminaire
        </span>

        <p className="min-w-0 flex-1 text-[0.82rem] leading-snug text-ink/85">
          Ce portail est en cours de construction. Les noms, numéros de badge,
          contacts et cours affichés sont des{" "}
          <strong className="font-semibold">exemples non officiels</strong>, en
          attente des données authentiques de la Coordination.
        </p>

        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem("cocomci-preview-hidden", "1");
            setOpen(false);
          }}
          className="label shrink-0 border border-ink/30 px-2.5 py-1 text-ink/70 transition-colors hover:bg-ink hover:text-paper-2"
          aria-label="Masquer l’avertissement"
        >
          Masquer
        </button>
      </div>
    </div>
  );
}
