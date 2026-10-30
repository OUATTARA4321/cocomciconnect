import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  intro,
  action,
  tone = "ink",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { href: string; label: string };
  tone?: "ink" | "paper";
}) {
  const isInk = tone === "ink";
  return (
    <div className="rule-heavy pt-5">
      <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
        <div className="max-w-2xl">
          <p className={`label ${isInk ? "text-stamp-dark" : "text-stamp-soft"}`}>{eyebrow}</p>
          <h2
            className={`mt-3 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] font-semibold tracking-[-0.015em] ${
              isInk ? "text-ink" : "text-paper-2"
            }`}
          >
            {title}
          </h2>
          {intro && (
            <p
              className={`mt-4 max-w-xl text-[1.02rem] leading-relaxed ${
                isInk ? "text-mute" : "text-paper-2/75"
              }`}
            >
              {intro}
            </p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className={`label inline-flex items-center gap-2 border px-4 py-3 transition-colors ${
              isInk
                ? "border-ink/30 text-ink hover:bg-ink hover:text-paper-2"
                : "border-paper-2/35 text-paper-2 hover:bg-paper-2 hover:text-ink"
            }`}
          >
            {action.label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export function Trend({
  value,
  suffix = "%",
  align = "left",
  onDark = false,
}: {
  value: number;
  suffix?: string;
  align?: "left" | "right";
  onDark?: boolean;
}) {
  const up = value > 0.001;
  const down = value < -0.001;
  const cls = onDark
    ? up
      ? "text-stamp-soft"
      : down
        ? "text-[#8ad9ac]"
        : "text-paper-2/70"
    : up
      ? "text-stamp-dark"
      : down
        ? "text-valid"
        : "text-mute";
  const sign = up ? "+" : down ? "−" : "±";
  return (
    <span
      className={`num inline-flex items-center gap-1 text-[0.82rem] font-semibold ${cls} ${
        align === "right" ? "justify-end" : ""
      }`}
    >
      <span aria-hidden="true">{up ? "▲" : down ? "▼" : "—"}</span>
      {sign}
      {Math.abs(value).toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
      {suffix}
    </span>
  );
}

export function PaperBand({ children }: { children: ReactNode }) {
  return <section className="relative bg-paper-2 grain">{children}</section>;
}

export type WallFace = {
  key: string;
  name: string;
  role: string;
  place: string;
  photo: string | null;
};

/** Trombinoscope : mur de portraits de la Coordination, planche-contact d'archives. */
export function PhotoWall({ faces }: { faces: WallFace[] }) {
  return (
    <ul className="grid grid-cols-3 gap-px bg-ink/15 sm:grid-cols-5 lg:grid-cols-8">
      {faces.map((f) => (
        <li key={f.key} className="badge-card group relative bg-paper-2">
          <div className="idphoto aspect-[4/5] w-full">
            {f.photo ? (
              <img
                src={f.photo}
                alt={`Portrait de ${f.name}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[50%_20%]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-paper-3">
                <span className="font-display text-[1.3rem] font-semibold text-ink/45">
                  {f.name
                    .split(/[\s-]+/)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
            )}
          </div>

          {/* Cartel, révélé au survol — l'image reste muette au repos */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-1 border-t-2 border-stamp bg-ink/80 px-2 py-1.5 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="truncate text-[0.72rem] leading-tight font-semibold text-paper-2">
              {f.name}
            </p>
            <p className="truncate text-[0.62rem] leading-tight text-paper-2/75">{f.role}</p>
          </div>

          <p className="truncate border-t border-ink/12 px-2 py-1.5 text-[0.66rem] leading-tight text-ink/60">
            {f.place}
          </p>
        </li>
      ))}
    </ul>
  );
}
