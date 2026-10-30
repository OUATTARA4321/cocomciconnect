"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";

export type ContactState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** Numéro d'enregistrement remis à l'expéditeur. */
  reference?: string;
};

const SUJETS = [
  "Adhésion à la Coordination",
  "Renouvellement de badge",
  "Signalement sur un marché",
  "Demande de cours ou de mercuriale",
  "Partenariat institutionnel ou privé",
  "Presse et communication",
  "Autre demande",
] as const;

/** Validation d'adresse électronique, volontairement permissive. */
function emailValide(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export async function envoyerMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const champ = (n: string) => String(formData.get(n) ?? "").trim();

  const fullName = champ("fullName");
  const email = champ("email");
  const phone = champ("phone");
  const organisation = champ("organisation");
  const subject = champ("subject");
  const region = champ("region");
  const body = champ("body");
  const consent = formData.get("consent");

  // Piège à robots : un champ masqué que seul un automate remplit.
  if (champ("website")) {
    return { status: "ok", message: "Message reçu.", reference: "—" };
  }

  const errors: Record<string, string> = {};
  if (fullName.length < 3) errors.fullName = "Indiquez vos nom et prénoms.";
  if (!emailValide(email)) errors.email = "Adresse électronique invalide.";
  if (!subject || !SUJETS.includes(subject as (typeof SUJETS)[number]))
    errors.subject = "Choisissez l’objet de votre message.";
  if (body.length < 20)
    errors.body = "Votre message doit compter au moins 20 caractères.";
  if (body.length > 4000) errors.body = "Votre message dépasse 4 000 caractères.";
  if (!consent) errors.consent = "Vous devez accepter le traitement de vos données.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Le formulaire comporte des champs à corriger.",
      errors,
    };
  }

  try {
    const now = new Date();
    const [row] = await db
      .insert(messages)
      .values({
        fullName,
        email,
        phone: phone || null,
        organisation: organisation || null,
        subject,
        region: region || null,
        body,
        receivedAt: now,
      })
      .returning({ id: messages.id });

    const reference = `COC-MSG-${now.getFullYear()}-${String(row.id).padStart(5, "0")}`;

    return {
      status: "ok",
      message:
        "Votre message a bien été enregistré au secrétariat. Une réponse vous parviendra sous trois jours ouvrés.",
      reference,
    };
  } catch {
    return {
      status: "error",
      message:
        "L’enregistrement a échoué. Réessayez ou appelez le secrétariat au +225 27 20 31 48 62.",
    };
  }
}

export { SUJETS };
