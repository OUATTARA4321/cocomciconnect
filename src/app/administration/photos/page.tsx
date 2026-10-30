import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { localOfficers, members } from "@/db/schema";
import { PhotoManager, type Person } from "@/components/PhotoManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portraits des membres — Administration COCOMCI",
};

export default async function PhotosAdminPage() {
  const [mem, off] = await Promise.all([
    db.select().from(members).orderBy(asc(members.id)),
    db.select().from(localOfficers).orderBy(asc(localOfficers.id)),
  ]);

  // Le Bureau Exécutif National d'abord, puis le réseau territorial.
  const people: Person[] = [
    ...mem
      .filter((m) => m.isBne)
      .map((m) => ({
        kind: "member" as const,
        id: m.id,
        name: m.fullName,
        role: m.function,
        place: `${m.region} · ${m.city}`,
        photo: m.photo,
      })),
    ...off.map((o) => ({
      kind: "officer" as const,
      id: o.id,
      name: o.fullName,
      role: o.role,
      place: `${o.scope} · ${o.level}`,
      photo: o.photo,
    })),
    ...mem
      .filter((m) => !m.isBne)
      .map((m) => ({
        kind: "member" as const,
        id: m.id,
        name: m.fullName,
        role: m.function,
        place: `${m.region} · ${m.city}`,
        photo: m.photo,
      })),
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-14">
          <Link href="/administration" className="label link-rule text-stamp-soft">
            ← Administration
          </Link>
          <p className="label mt-9 text-paper-2/70">Portraits officiels</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[0.98] font-semibold tracking-[-0.022em] text-paper-2">
            Photos des membres et responsables.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-paper-2/85">
            Choisissez une personne, déposez sa photographie : elle est recadrée au format
            d’identité, optimisée, puis affichée aussitôt sur son badge officiel, dans
            l’annuaire et dans le trombinoscope.
          </p>
        </div>
      </section>

      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-14">
          <PhotoManager people={people} />
        </div>
      </section>

      <section className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-14">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Conseils de prise de vue</p>
          </div>
          <div className="mt-7 grid gap-x-12 gap-y-6 md:grid-cols-3">
            <div>
              <p className="font-display text-[1.1rem] font-semibold text-ink">Cadrage</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-mute">
                Buste et visage, de face, regard vers l’objectif. Le recadrage automatique
                conserve le haut du sujet : laissez un peu d’air au-dessus de la tête.
              </p>
            </div>
            <div>
              <p className="font-display text-[1.1rem] font-semibold text-ink">Lumière</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-mute">
                Lumière du jour, de préférence à l’ombre ou près d’une fenêtre. Évitez le
                plein soleil, qui creuse les ombres sur le visage.
              </p>
            </div>
            <div>
              <p className="font-display text-[1.1rem] font-semibold text-ink">Dimension</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-mute">
                800 × 1 000 px au minimum. Une photo prise au téléphone en mode portrait
                convient parfaitement : elle sera réduite automatiquement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
