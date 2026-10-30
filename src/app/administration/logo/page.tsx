import Link from "next/link";
import { LogoUploader } from "@/components/LogoUploader";
import { getBrandLogo } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Déposer le logo officiel — COCOMCI",
  description:
    "Dépôt du logo officiel de la COCOMCI : conversion automatique du PDF en SVG vectoriel et diffusion sur l’ensemble du site.",
};

const ETAPES = [
  {
    n: "01",
    t: "Déposez le PDF",
    d: "Glissez le fichier fourni par votre graphiste. Le format PDF d’origine est accepté tel quel, sans conversion préalable de votre part.",
  },
  {
    n: "02",
    t: "Vectorisation automatique",
    d: "Le serveur extrait le tracé vectoriel de la première page et le convertit en SVG. Si le PDF ne contient que du bitmap, un PNG de 1 600 px est produit.",
  },
  {
    n: "03",
    t: "Diffusion immédiate",
    d: "Le logo remplace la marque dessinée partout : en-tête, pied de page, badges officiels et bandeau des cours. Aucun redéploiement n’est nécessaire.",
  },
];

export default async function LogoAdminPage() {
  const logo = await getBrandLogo();

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-16">
          <Link href="/" className="label link-rule text-stamp-soft">
            ← Retour au portail
          </Link>
          <p className="label mt-10 text-paper-2/70">Administration · Identité visuelle</p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.025em] text-paper-2">
            Déposer le logo
            <br />
            <span className="text-stamp-soft italic">officiel</span> de la COCOMCI.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-paper-2/85">
            Votre logo est un PDF ? Déposez-le directement : il est converti en SVG vectoriel et
            diffusé sur l’ensemble du portail. Un navigateur ne sait pas afficher un PDF comme une
            image — cette page s’en charge pour vous.
          </p>
        </div>
      </section>

      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <LogoUploader
            current={
              logo
                ? {
                    url: logo.url,
                    filename: logo.filename,
                    mime: logo.mime,
                    bytes: logo.bytes,
                    sourceFormat: logo.sourceFormat,
                  }
                : null
            }
          />
        </div>
      </section>

      <section className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Comment cela fonctionne</p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.08] font-semibold text-ink">
              Du PDF du graphiste au logo affiché.
            </h2>
          </div>

          <div className="mt-10 grid gap-px border border-ink/15 bg-ink/15 md:grid-cols-3">
            {ETAPES.map((e) => (
              <div key={e.n} className="bg-paper p-7">
                <p className="num font-display text-[2.2rem] leading-none font-semibold text-stamp">
                  {e.n}
                </p>
                <h3 className="mt-4 font-display text-[1.2rem] leading-tight font-semibold text-ink">
                  {e.t}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">{e.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-x-12 gap-y-8 border-t border-ink/15 pt-8 lg:grid-cols-2">
            <div>
              <p className="label text-stamp-dark">Pour le meilleur rendu</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-mute">
                <li>
                  — Fournissez un PDF <strong className="text-ink">vectoriel</strong> (export
                  Illustrator, Inkscape ou Affinity), pas un scan.
                </li>
                <li>
                  — <strong className="text-ink">Vectorisez les textes</strong> avant l’export :
                  les polices ne sont pas embarquées dans la conversion.
                </li>
                <li>
                  — Recadrez le plan de travail au plus près du logo, sans marge blanche.
                </li>
                <li>
                  — Un <strong className="text-ink">SVG</strong> donne le même résultat et pèse
                  moins lourd : si vous l’avez, préférez-le.
                </li>
              </ul>
            </div>
            <div>
              <p className="label text-stamp-dark">En ligne de commande</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">
                Vous pouvez aussi convertir vous-même avant le dépôt :
              </p>
              <pre className="num mt-4 overflow-x-auto border border-ink/20 bg-ink px-4 py-3 text-[0.78rem] leading-relaxed text-paper-2">
{`# PDF vers SVG vectoriel
pdftocairo -svg logo.pdf logo.svg

# PDF vers PNG transparent, 1600 px
pdftocairo -png -transp -scale-to-x 1600 \\
  -scale-to-y -1 logo.pdf logo`}
              </pre>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-mute">
                Le dépôt direct du PDF sur cette page produit le même résultat, sans installer
                d’outil.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
