/**
 * Liens de contact d'un responsable : téléphone, WhatsApp, courriel.
 * Composant serveur : de simples ancres, aucun JavaScript nécessaire.
 */

/** Icône WhatsApp officielle, tracée au trait. */
export function WhatsAppIcon({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24z" />
    </svg>
  );
}

const WA_GREEN = "#1F8A4C";

function waLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Rangée de contact compacte, sous un badge.
 * `compact` masque les libellés et ne garde que les pictogrammes.
 */
export function ContactRow({
  name,
  role,
  phone,
  whatsapp,
  email,
  compact = false,
}: {
  name: string;
  role?: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  compact?: boolean;
}) {
  const message = role
    ? `Bonjour ${name}, je vous contacte depuis le portail COCOMCI au sujet de votre fonction de ${role}.`
    : `Bonjour ${name}, je vous contacte depuis le portail COCOMCI.`;

  if (!phone && !whatsapp && !email) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {phone && (
        <a
          href={`tel:+${(whatsapp ?? phone).replace(/\D/g, "")}`}
          className="num inline-flex items-center gap-1.5 text-[0.78rem] text-ink/75 transition-colors hover:text-ink"
          aria-label={`Appeler ${name} au ${phone}`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
          </svg>
          {phone}
        </a>
      )}

      {whatsapp && (
        <a
          href={waLink(whatsapp, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border px-2 py-1 text-[0.74rem] font-semibold transition-colors"
          style={{ borderColor: `${WA_GREEN}66`, color: WA_GREEN }}
          aria-label={`Écrire à ${name} sur WhatsApp`}
        >
          <WhatsAppIcon size={13} />
          {compact ? "WhatsApp" : "Écrire sur WhatsApp"}
        </a>
      )}

      {email && !compact && (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 text-[0.78rem] text-ink/60 transition-colors hover:text-stamp-dark"
          aria-label={`Envoyer un courriel à ${name}`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 7L4.4 6.2 4 6v.5l8 5 8-5V6l-.4.2L12 11z" />
          </svg>
          {email}
        </a>
      )}
    </div>
  );
}

/** Bouton WhatsApp pleine largeur, pour les bureaux de filière. */
export function WhatsAppButton({
  number,
  name,
  role,
  label = "Contacter sur WhatsApp",
}: {
  number: string;
  name: string;
  role?: string;
  label?: string;
}) {
  const message = role
    ? `Bonjour ${name}, je vous contacte depuis le portail COCOMCI au sujet de la filière (${role}).`
    : `Bonjour ${name}, je vous contacte depuis le portail COCOMCI.`;

  return (
    <a
      href={waLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="label inline-flex items-center justify-center gap-2 px-4 py-2.5 text-paper-2 transition-opacity hover:opacity-88"
      style={{ background: WA_GREEN }}
    >
      <WhatsAppIcon size={15} />
      {label}
    </a>
  );
}
