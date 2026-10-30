"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type ActivitySlide = {
  id: number;
  title: string;
  caption: string;
  place: string;
  kind: string;
  image: string;
  heldAt: string;
};

const DURATION = 6200;

function frenchDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Reportage défilant des activités : avance automatique, pause au survol et au focus,
 * pellicule de vignettes, navigation clavier et glissé tactile.
 */
export function ActivityCarousel({ slides }: { slides: ActivitySlide[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stripRef = useRef<HTMLUListElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );
  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Avance automatique
  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), DURATION);
    return () => window.clearTimeout(t);
  }, [index, paused, reduced, count]);

  // La vignette active reste visible dans la pellicule
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !active) return;
    const left = active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2;
    strip.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [index, reduced]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const current = slides[index];
  const numbers = useMemo(
    () => ({
      now: String(index + 1).padStart(2, "0"),
      total: String(count).padStart(2, "0"),
    }),
    [index, count],
  );

  if (count === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Scène */}
      <div
        role="region"
        aria-roledescription="carrousel"
        aria-label="Reportage des activités de la COCOMCI"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX ?? null;
          if (start === null || end === null) return;
          if (Math.abs(end - start) > 44) (end < start ? next : prev)();
          touchX.current = null;
        }}
        className="group relative overflow-hidden border border-ink/25 bg-ink"
      >
        {/* Piste */}
        <div
          className="flex h-[clamp(280px,46vw,540px)] w-full"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: reduced ? "none" : "transform 800ms cubic-bezier(0.65,0,0.35,1)",
          }}
        >
          {slides.map((s, i) => (
            <figure
              key={s.id}
              className="reportage relative h-full w-full shrink-0"
              aria-hidden={i !== index}
            >
              <img
                src={s.image}
                alt={s.title}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover object-center"
                style={{
                  transform: i === index && !reduced ? "scale(1.05)" : "scale(1)",
                  transition: reduced ? "none" : "transform 7s linear",
                }}
              />
            </figure>
          ))}
        </div>

        {/* Voiles d'encre : la légende doit rester lisible sur toute photo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/65 via-transparent to-transparent" />

        {/* Étiquette de rubrique : verre dépoli, filet orange en pied */}
        <span className="label absolute top-0 left-0 z-30 border-b-2 border-stamp bg-ink/55 px-3.5 py-2 text-paper-2 backdrop-blur-md">
          {current.kind}
        </span>

        {/* Compteur */}
        <span className="num absolute top-4 right-4 z-10 font-display text-[1.05rem] font-semibold text-paper-2/85">
          {numbers.now}
          <span className="text-paper-2/45"> / {numbers.total}</span>
        </span>

        {/* Légende */}
        <figcaption className="absolute inset-x-0 bottom-0 z-10 px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="border-l-[3px] border-stamp pl-4">
            <p className="label num text-stamp-soft">
              {frenchDate(current.heldAt)} · {current.place}
            </p>
            <h3 className="mt-2.5 max-w-2xl font-display text-[clamp(1.3rem,2.7vw,2.1rem)] leading-[1.1] font-semibold text-paper-2">
              {current.title}
            </h3>
            <p className="mt-2.5 hidden max-w-xl text-[0.95rem] leading-relaxed text-paper-2/80 sm:block">
              {current.caption}
            </p>
          </div>
        </figcaption>

        {/* Commandes */}
        <div className="absolute right-4 bottom-4 z-10 flex gap-2 sm:right-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Photographie précédente"
            className="flex h-10 w-10 items-center justify-center border border-paper-2/45 text-paper-2 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Photographie suivante"
            className="flex h-10 w-10 items-center justify-center border border-paper-2/45 text-paper-2 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Minuterie de défilement */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-paper-2/20">
          <div
            key={`${index}-${paused}-${reduced}`}
            className="h-full bg-stamp"
            style={
              paused || reduced
                ? { width: "100%", opacity: 0.45 }
                : { animation: `slideTimer ${DURATION}ms linear forwards` }
            }
          />
        </div>

        <span className="label pointer-events-none absolute bottom-5 left-5 z-10 text-paper-2/45 opacity-0 transition-opacity group-hover:opacity-100 sm:left-8">
          Défilement en pause
        </span>
      </div>

      {/* Pellicule de vignettes */}
      <ul
        ref={stripRef}
        className="mt-3 flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "thin" }}
      >
        {slides.map((s, i) => (
          <li key={s.id} className="shrink-0">
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`Afficher : ${s.title}`}
              aria-current={i === index}
              className={`reportage relative block h-14 w-24 overflow-hidden border transition-all sm:h-16 sm:w-28 ${
                i === index
                  ? "border-stamp opacity-100"
                  : "border-ink/25 opacity-55 hover:opacity-90"
              }`}
            >
              <img
                src={s.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span
                className={`num absolute right-1 bottom-0.5 text-[0.6rem] font-semibold ${
                  i === index ? "text-paper-2" : "text-paper-2/70"
                }`}
                style={{ textShadow: "0 1px 2px rgba(18,48,31,.9)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
