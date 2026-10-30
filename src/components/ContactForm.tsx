"use client";

import { useActionState } from "react";
import { envoyerMessage, type ContactState } from "@/app/actions/contact";

const SUJETS = [
  "Adhésion à la Coordination",
  "Renouvellement de badge",
  "Signalement sur un marché",
  "Demande de cours ou de mercuriale",
  "Partenariat institutionnel ou privé",
  "Presse et communication",
  "Autre demande",
];

const REGIONS = [
  "Lagunes", "Yamoussoukro", "Bas-Sassandra", "Savanes", "Worodougou",
  "Moyen-Comoé", "Hambol", "Lôh-Djiboua", "Denguélé", "Nawa", "Bafing",
  "Gontougo", "Vallée du Bandama", "Autre / hors Côte d’Ivoire",
];

const etatInitial: ContactState = { status: "idle" };

/** Astérisque rouge des champs obligatoires. */
function Obligatoire() {
  return (
    <span className="ml-0.5 text-stamp" aria-hidden="true">
      *
    </span>
  );
}

function Champ({
  id,
  label,
  requis = false,
  aide,
  erreur,
  children,
}: {
  id: string;
  label: string;
  requis?: boolean;
  aide?: string;
  erreur?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label block text-ink/75">
        {label}
        {requis && <Obligatoire />}
      </label>
      <div className="mt-2">{children}</div>
      {erreur ? (
        <p id={`${id}-erreur`} role="alert" className="mt-1.5 text-[0.78rem] text-stamp-dark">
          {erreur}
        </p>
      ) : aide ? (
        <p id={`${id}-aide`} className="mt-1.5 text-[0.78rem] leading-snug text-mute/85">
          {aide}
        </p>
      ) : null}
    </div>
  );
}

const base =
  "w-full border bg-paper-2 px-3.5 py-3 text-[0.92rem] text-ink placeholder:text-ink/35 focus:border-stamp focus:outline-none";
const ok = "border-ink/25";
const ko = "border-stamp bg-stamp/5";

export function ContactForm() {
  const [state, action, pending] = useActionState(envoyerMessage, etatInitial);
  const e = state.errors ?? {};

  if (state.status === "ok") {
    return (
      <div className="border border-valid/40 bg-valid/8 px-7 py-9">
        <p className="label text-valid">Message transmis</p>
        <p className="mt-4 font-display text-[1.5rem] leading-tight font-semibold text-ink">
          Merci, votre message est enregistré.
        </p>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-mute">{state.message}</p>
        {state.reference && state.reference !== "—" && (
          <p className="num mt-5 border-t border-valid/25 pt-4 text-[0.88rem] text-ink">
            Référence à rappeler :{" "}
            <strong className="font-semibold">{state.reference}</strong>
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      {/* Piège à robots, invisible et hors du parcours clavier */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      {state.status === "error" && state.message && (
        <div role="alert" className="border-l-2 border-stamp bg-stamp/8 px-4 py-3">
          <p className="text-[0.9rem] text-ink">{state.message}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Champ id="fullName" label="Nom et prénoms" requis erreur={e.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="KOUAME Adjoua"
            aria-invalid={Boolean(e.fullName)}
            className={`${base} ${e.fullName ? ko : ok}`}
          />
        </Champ>

        <Champ
          id="email"
          label="Adresse électronique"
          requis
          erreur={e.email}
          aide="C’est à cette adresse que la réponse vous parviendra."
        >
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="nom@exemple.ci"
            aria-invalid={Boolean(e.email)}
            className={`${base} ${e.email ? ko : ok}`}
          />
        </Champ>

        <Champ id="phone" label="Téléphone ou WhatsApp" aide="Facultatif — accélère le traitement.">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="07 00 00 00 00"
            className={`${base} ${ok} num`}
          />
        </Champ>

        <Champ id="organisation" label="Établissement ou coopérative" aide="Facultatif.">
          <input
            id="organisation"
            name="organisation"
            type="text"
            placeholder="Nom de votre structure"
            className={`${base} ${ok}`}
          />
        </Champ>

        <Champ id="subject" label="Objet du message" requis erreur={e.subject}>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            aria-invalid={Boolean(e.subject)}
            className={`${base} ${e.subject ? ko : ok}`}
          >
            <option value="" disabled>
              Choisissez un objet…
            </option>
            {SUJETS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Champ>

        <Champ id="region" label="Région concernée" aide="Facultatif.">
          <select id="region" name="region" defaultValue="" className={`${base} ${ok}`}>
            <option value="">Non précisée</option>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Champ>
      </div>

      <Champ
        id="body"
        label="Votre message"
        requis
        erreur={e.body}
        aide="Exposez votre demande en quelques lignes : marché concerné, produit, numéro de badge si vous en possédez un. Vingt caractères minimum."
      >
        <textarea
          id="body"
          name="body"
          required
          rows={7}
          minLength={20}
          maxLength={4000}
          placeholder="Bonjour, je suis opérateur au marché de… et je souhaite…"
          aria-invalid={Boolean(e.body)}
          className={`${base} ${e.body ? ko : ok} resize-y leading-relaxed`}
        />
      </Champ>

      <div>
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[#D9531E]"
          />
          <span className="text-[0.84rem] leading-snug text-mute">
            J’autorise la COCOMCI à conserver ces informations pour traiter ma demande.
            <Obligatoire />
          </span>
        </label>
        {e.consent && (
          <p role="alert" className="mt-1.5 text-[0.78rem] text-stamp-dark">
            {e.consent}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/15 pt-5">
        <button
          type="submit"
          disabled={pending}
          className="label inline-flex items-center gap-2 bg-ink px-7 py-4 text-paper-2 transition-colors hover:bg-stamp disabled:opacity-55"
        >
          {pending ? "Envoi en cours…" : "Envoyer le message"}
          {!pending && <span aria-hidden="true">→</span>}
        </button>
        <p className="text-[0.8rem] leading-snug text-mute">
          Les champs marqués d’un <span className="text-stamp">*</span> sont obligatoires.
        </p>
      </div>
    </form>
  );
}
