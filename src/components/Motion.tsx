"use client";

import { useEffect } from "react";

/**
 * Comportements d'impression : révélation des blocs au scroll et pose des chiffres clés.
 * Les valeurs finales sont déjà rendues côté serveur — JavaScript ne fait que les animer.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealables = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce || !("IntersectionObserver" in window)) {
      revealables.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay ?? 0);
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      revealables.forEach((el) => io.observe(el));
    }

    // Compteurs : départ bas, arrivée sur la valeur réelle déjà affichée.
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const animate = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const decimals = Number(el.dataset.countDecimals ?? 0);
      const suffix = el.dataset.countSuffix ?? "";
      const prefix = el.dataset.countPrefix ?? "";
      if (!Number.isFinite(target) || reduce) return;
      const duration = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = target * eased;
        el.textContent = `${prefix}${value.toLocaleString("fr-FR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animate(entry.target as HTMLElement);
            cio.unobserve(entry.target);
          });
        },
        { threshold: 0.5 },
      );
      counters.forEach((el) => cio.observe(el));
    }

    return () => {};
  }, []);

  return <>{children}</>;
}
