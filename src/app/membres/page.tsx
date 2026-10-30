import { PhotoWall, type WallFace } from "@/components/Bits";
import { ContactRow } from "@/components/Contact";
import { MembersDirectory, OfficersDirectory } from "@/components/Interactive";
import { OfficialBadge, Seal } from "@/components/Seal";
import { getLocalOfficers, getMembers } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Annuaire des membres & badges officiels — COCOMCI",
  description:
    "Les opérateurs de commerce adhérents à la COCOMCI, leur badge officiel, leur numéro d’agrément, leur région et leur ville — ainsi que les Coordinateurs et Secrétaires généraux des régions, villes et communes, titulaires d’un badge validé.",
};

export default async function MembresPage() {
  const [members, officers] = await Promise.all([getMembers(), getLocalOfficers()]);
  const bne = members.filter((m) => m.isBne);

  const regionRows = Object.values(
    members.reduce<
      Record<
        string,
        {
          region: string;
          city: string;
          referent: string;
          sector: string;
          count: number;
        }
      >
    >((acc, m) => {
      const entry = acc[m.region] ?? {
        region: m.region,
        city: m.city,
        referent: m.fullName,
        sector: m.sector,
        count: 0,
      };
      entry.count += 1;
      acc[m.region] = entry;
      return acc;
    }, {}),
  );

  const countLevel = (level: string) => officers.filter((o) => o.level === level).length;
  const validated = officers.filter((o) => o.status === "Badge validé").length;

  const officerRows = officers.map((o) => ({
    ...o,
    validatedAt: o.validatedAt.toISOString(),
  }));

  // Trombinoscope : BNE d'abord, puis le réseau territorial, puis les adhérents.
  const seen = new Set<string>();
  const faces: WallFace[] = [
    ...bne.map((m) => ({
      key: `m-${m.id}`,
      name: m.fullName,
      role: m.function,
      place: `${m.region} · ${m.city}`,
      photo: m.photo,
    })),
    ...officers.map((o) => ({
      key: `o-${o.id}`,
      name: o.fullName,
      role: o.role,
      place: o.scope,
      photo: o.photo,
    })),
    ...members
      .filter((m) => !m.isBne)
      .map((m) => ({
        key: `a-${m.id}`,
        name: m.fullName,
        role: m.function,
        place: `${m.region} · ${m.city}`,
        photo: m.photo,
      })),
  ].filter((f) => {
    if (seen.has(f.name)) return false;
    seen.add(f.name);
    return true;
  });
  const withPhoto = faces.filter((f) => f.photo).length;

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute -right-10 -bottom-24 opacity-[0.08]">
          <Seal id="membres-band" size={420} tone="#f3ede1" />
        </div>
        <div className="relative mx-auto max-w-[1240px] px-5 pt-16 pb-18">
          <p className="label text-stamp-soft">Annuaire officiel · Campagne de badge 2026</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.025em] text-paper-2">
            Les opérateurs badgeés
            <br />
            de la <span className="text-stamp-soft italic">Coordination</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-paper-2/85">
            Chaque adhérent dispose d’un badge officiel portant un numéro d’agrément unique, un code
            régional et son secteur d’activité. Le badge est exigible lors des contrôles sur les
            marchés et ouvre l’accès aux cours négociés, aux formations et aux assises régionales.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p className="num font-display text-[2.1rem] leading-none font-semibold text-paper-2">
                {members.length}
              </p>
              <p className="label mt-2 text-paper-2/65">adhérents sur cet extrait</p>
            </div>
            <div>
              <p className="num font-display text-[2.1rem] leading-none font-semibold text-paper-2">
                {officers.length}
              </p>
              <p className="label mt-2 text-paper-2/65">mandats territoriaux</p>
            </div>
            <div>
              <p className="num font-display text-[2.1rem] leading-none font-semibold text-paper-2">
                {new Set(members.map((m) => m.region)).size}
              </p>
              <p className="label mt-2 text-paper-2/65">régions représentées</p>
            </div>
            <div>
              <p className="num font-display text-[2.1rem] leading-none font-semibold text-paper-2">
                1 240
              </p>
              <p className="label mt-2 text-paper-2/65">adhérents au registre national</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trombinoscope */}
      <section className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <div>
                <p className="label text-stamp-dark">Trombinoscope</p>
                <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-semibold text-ink">
                  Les visages de la Coordination.
                </h2>
              </div>
              <p className="num label text-mute">
                {withPhoto} portraits déposés sur {faces.length} mandats
              </p>
            </div>
          </div>

          <div className="mt-9">
            <PhotoWall faces={faces} />
          </div>

          <p className="label mt-5 text-mute/80">
            Photographies d&apos;identité déposées au Secrétariat Général · Survolez un portrait pour
            afficher le nom et la fonction
          </p>
        </div>
      </section>

      {/* Bureau Exécutif National */}
      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Le Bureau Exécutif National</p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-semibold text-ink">
              L’équipe qui porte la Coordination entre deux sessions.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {bne.map((m) => (
              <div key={m.id} data-reveal>
                <OfficialBadge
                  id={`bne-${m.id}`}
                  badgeNumber={m.badgeNumber}
                  name={m.fullName}
                  title={m.function}
                  region={m.region}
                  city={m.city}
                  status={m.status}
                  photo={m.photo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coordinateurs & Secrétaires généraux */}
      <section id="reseau" className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">
              Le réseau territorial · Régions, villes et communes
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-semibold text-ink">
              Les Coordinateurs et Secrétaires généraux
              <br />
              des régions, villes et communes.
            </h2>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-mute">
              À l’image du Bureau Exécutif National, chaque échelon territorial dispose de son
              coordinateur et de son secrétaire général. Ces mandats sont confirmés par un{" "}
              <strong className="font-semibold text-ink">badge validé</strong>, portant numéro
              d’agrément, échelon, circonscription et date de validation. Les badges sont vérifiés
              par le Secrétariat Général et renouvelés chaque année.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-ink/15 py-7 sm:grid-cols-4">
            <div>
              <p className="num font-display text-[2.2rem] leading-none font-semibold text-ink">
                {countLevel("Région")}
              </p>
              <p className="label mt-2 text-mute">mandats régionaux</p>
            </div>
            <div>
              <p className="num font-display text-[2.2rem] leading-none font-semibold text-ink">
                {countLevel("Ville")}
              </p>
              <p className="label mt-2 text-mute">coordinateurs de ville</p>
            </div>
            <div>
              <p className="num font-display text-[2.2rem] leading-none font-semibold text-ink">
                {countLevel("Commune")}
              </p>
              <p className="label mt-2 text-mute">secrétaires généraux communaux</p>
            </div>
            <div>
              <p className="num font-display text-[2.2rem] leading-none font-semibold text-valid">
                {validated}/{officers.length}
              </p>
              <p className="label mt-2 text-mute">badges validés</p>
            </div>
          </div>

          <div className="mt-9">
            <OfficersDirectory rows={officerRows} />
          </div>
        </div>
      </section>

      {/* Annuaire téléphonique */}
      <section id="contacts" className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <div>
                <p className="label text-stamp-dark">Annuaire téléphonique</p>
                <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-semibold text-ink">
                  Joindre un coordinateur ou un secrétaire général.
                </h2>
              </div>
              <p className="num label text-mute">
                {officers.filter((o) => o.whatsapp).length} responsables joignables sur WhatsApp
              </p>
            </div>
          </div>

          <div className="mt-7 overflow-x-auto">
            <table className="ledger w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="label py-3 pr-4 text-ink/65">Responsable</th>
                  <th className="label py-3 pr-4 text-ink/65">Fonction</th>
                  <th className="label py-3 pr-4 text-ink/65">Circonscription</th>
                  <th className="label py-3 pr-4 text-ink/65">Téléphone</th>
                  <th className="label py-3 text-ink/65">Messagerie</th>
                </tr>
              </thead>
              <tbody>
                {officers.map((o) => (
                  <tr key={o.id}>
                    <td className="py-3.5 pr-4 font-medium text-ink">{o.fullName}</td>
                    <td className="py-3.5 pr-4 text-[0.85rem] text-mute">{o.role}</td>
                    <td className="py-3.5 pr-4 text-[0.85rem] text-mute">
                      {o.scope}
                      <span className="ml-1.5 text-ink/45">{o.level}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <a
                        href={`tel:+${(o.whatsapp ?? o.phone).replace(/\D/g, "")}`}
                        className="num text-[0.86rem] text-ink hover:text-stamp-dark"
                      >
                        {o.phone}
                      </a>
                    </td>
                    <td className="py-3.5">
                      <ContactRow
                        name={o.fullName}
                        role={o.role}
                        whatsapp={o.whatsapp}
                        email={o.email}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="label mt-6 text-mute/80">
            Lignes officielles des responsables territoriaux · Un clic sur WhatsApp ouvre une
            conversation avec un message pré-rempli
          </p>
        </div>
      </section>

      {/* Régions représentées */}
      <section className="relative bg-paper-2 grain">
        <div className="relative mx-auto max-w-[1240px] px-5 pb-16">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Découpage régional</p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.08] font-semibold text-ink">
              Un référent, une ville, une section régionale.
            </h2>
          </div>

          <div className="mt-7 overflow-x-auto">
            <table className="ledger w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="label py-3 pr-4 text-ink/65">Région</th>
                  <th className="label py-3 pr-4 text-ink/65">Ville du siège régional</th>
                  <th className="label py-3 pr-4 text-ink/65">Référent</th>
                  <th className="label py-3 pr-4 text-ink/65">Secteur dominant</th>
                  <th className="label py-3 text-right text-ink/65">Badgeés</th>
                </tr>
              </thead>
              <tbody>
                {regionRows.map((r) => (
                  <tr key={r.region}>
                    <td className="py-3.5 pr-4 font-medium text-ink">{r.region}</td>
                    <td className="py-3.5 pr-4 text-[0.88rem] text-mute">{r.city}</td>
                    <td className="py-3.5 pr-4 text-[0.88rem] text-ink">{r.referent}</td>
                    <td className="py-3.5 pr-4 text-[0.88rem] text-mute">{r.sector}</td>
                    <td className="num py-3.5 text-right text-[0.98rem] font-semibold text-ink">
                      {r.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Annuaire filtrable */}
      <section className="relative bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="rule-heavy pt-5">
            <p className="label text-stamp-dark">Répertoire</p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-semibold text-ink">
              Chercher un opérateur par région, ville ou secteur.
            </h2>
          </div>
          <div className="mt-9">
            <MembersDirectory rows={members} />
          </div>
        </div>
      </section>

      {/* Adhésion */}
      <section className="relative overflow-hidden bg-stamp text-paper-2">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 px-5 py-14">
          <div>
            <p className="label text-paper-2/80">Adhésion & renouvellement</p>
            <p className="mt-3 max-w-2xl font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.1] font-semibold">
              Le renouvellement des badges est ouvert jusqu’au 31 mars 2026.
            </p>
          </div>
          <a
            href="/#contact"
            className="label inline-flex items-center gap-2 border border-paper-2/70 px-6 py-4 transition-colors hover:bg-paper-2 hover:text-stamp-dark"
          >
            Contacter le secrétariat régional
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
