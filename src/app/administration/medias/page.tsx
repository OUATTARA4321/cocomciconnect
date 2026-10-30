import Link from "next/link";
import { MediaLibrary } from "@/components/MediaLibrary";
import { listMedia } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bibliothèque d’images — Administration COCOMCI",
};

export default async function MediasAdminPage() {
  const items = await listMedia();

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-14">
          <Link href="/administration" className="label link-rule text-stamp-soft">
            ← Administration
          </Link>
          <p className="label mt-9 text-paper-2/70">Bibliothèque</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[0.98] font-semibold tracking-[-0.022em] text-paper-2">
            Images des activités et du portail.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-paper-2/85">
            Déposez les photographies d’assemblées, de formations, de visites de marchés. Chaque
            image reçoit une adresse permanente, à transmettre pour l’illustration des dépêches
            et du carrousel des activités.
          </p>
        </div>
      </section>

      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-14">
          <MediaLibrary
            items={items.map((m) => ({
              slug: m.slug,
              title: m.title,
              usage: m.usage,
              width: m.width,
              height: m.height,
              bytes: m.bytes,
            }))}
          />
        </div>
      </section>
    </>
  );
}
