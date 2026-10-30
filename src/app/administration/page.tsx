import Link from "next/link";
import { db } from "@/db";
import { localOfficers, members } from "@/db/schema";
import { getBrandLogo } from "@/lib/brand";
import { listMedia } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Administration — COCOMCI",
  description: "Espace réservé : logo, portraits des membres et bibliothèque d’images.",
};

export default async function AdminHome() {
  const [logo, medias, mem, off] = await Promise.all([
    getBrandLogo(),
    listMedia(),
    db.select({ photo: members.photo }).from(members),
    db.select({ photo: localOfficers.photo }).from(localOfficers),
  ]);

  const people = [...mem, ...off];
  const withPhoto = people.filter((p) => p.photo).length;

  const cards = [
    {
      href: "/administration/photos",
      eyebrow: "Portraits",
      title: "Photos des membres et responsables",
      text: "Téléversez le portrait de chaque membre du Bureau, coordinateur et secrétaire général. Le recadrage en format d’identité est automatique.",
      stat: `${withPhoto} / ${people.length}`,
      statLabel: "portraits en place",
    },
    {
      href: "/administration/medias",
      eyebrow: "Bibliothèque",
      title: "Images des activités et du portail",
      text: "Photographies d’assemblées, de formations, de marchés. Déposez plusieurs fichiers à la fois et récupérez leur adresse.",
      stat: String(medias.length),
      statLabel: "images déposées",
    },
    {
      href: "/administration/logo",
      eyebrow: "Identité",
      title: "Logo officiel de la Coordination",
      text: "Déposez le logo au format PDF, SVG ou image. Il remplace la marque dessinée sur tout le portail.",
      stat: logo ? "Déposé" : "Absent",
      statLabel: logo ? logo.sourceFormat.toUpperCase() : "marque dessinée",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-16">
          <Link href="/" className="label link-rule text-stamp-soft">
            ← Retour au portail
          </Link>
          <p className="label mt-10 text-paper-2/70">Espace réservé</p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.025em] text-paper-2">
            Administration de la
            <br />
            <span className="text-stamp-soft italic">plateforme</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-paper-2/85">
            Déposez ici les photographies authentiques des membres, les images des activités et
            le logo officiel. Les fichiers sont conservés en base de données : ils survivent aux
            mises à jour du site.
          </p>
        </div>
      </section>

      {!process.env.ADMIN_PASSWORD && (
        <div className="border-b-2 border-stamp bg-stamp/15">
          <div className="mx-auto max-w-[1240px] px-5 py-3">
            <p className="label text-stamp-dark">Espace non protégé</p>
            <p className="mt-1.5 text-[0.9rem] leading-snug text-ink/85">
              Aucun mot de passe n’est configuré : cette page est accessible à toute personne
              connaissant son adresse. Avant la mise en ligne publique, définissez la variable{" "}
              <code className="num bg-ink/10 px-1.5 py-0.5">ADMIN_PASSWORD</code> chez votre
              hébergeur.
            </p>
          </div>
        </div>
      )}

      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <div className="grid gap-px border border-ink/15 bg-ink/15 md:grid-cols-3">
            {cards.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col bg-paper-2 p-7 transition-colors hover:bg-ink"
              >
                <p className="label text-stamp-dark transition-colors group-hover:text-stamp-soft">
                  {c.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-[1.35rem] leading-tight font-semibold text-ink transition-colors group-hover:text-paper-2">
                  {c.title}
                </h2>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-mute transition-colors group-hover:text-paper-2/70">
                  {c.text}
                </p>
                <p className="num mt-6 font-display text-[1.8rem] leading-none font-semibold text-ink transition-colors group-hover:text-stamp-soft">
                  {c.stat}
                </p>
                <p className="label mt-1.5 text-mute transition-colors group-hover:text-paper-2/60">
                  {c.statLabel}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 border-l-2 border-stamp bg-stamp/8 px-6 py-5">
            <p className="label text-stamp-dark">Rappel important</p>
            <p className="mt-2 max-w-3xl text-[0.95rem] leading-relaxed text-ink/85">
              La publication de la photographie d’une personne exige son accord. Recueillez
              l’autorisation écrite de chaque membre avant de déposer son portrait sur le portail.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
