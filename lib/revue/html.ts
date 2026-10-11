// Contrôle du lien de désinscription Resend dans le HTML du modèle.

export const VARIABLE_DESINSCRIPTION = "{{{RESEND_UNSUBSCRIBE_URL}}}";

const HREF_DESINSCRIPTION = /href\s*=\s*(["'])\s*\{\{\{\s*RESEND_UNSUBSCRIBE_URL\s*\}\}\}\s*\1/i;
const SPAN_VARIABLE = /<span[^>]*data-type\s*=\s*["']variable["'][^>]*>/i;

export const PIED_DESINSCRIPTION =
  '<div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-family:Arial,sans-serif;font-size:12px;color:#6b7280;text-align:center;">' +
  "Vous recevez cet e-mail en tant que membre de la Fédération des Entreprises du Gabon. " +
  `<a href="${VARIABLE_DESINSCRIPTION}" style="color:#6b7280;text-decoration:underline;">Se désinscrire</a>` +
  "</div>";

export interface ResultatDesinscription {
  html: string;
  /** Message à signaler dans le compte rendu si un pied a été ajouté. */
  avertissement?: string;
}

export function aLienDesinscription(html: string): boolean {
  return HREF_DESINSCRIPTION.test(html);
}

/** Ajoute un pied « Se désinscrire » si le lien n'est pas présent dans un href. */
export function garantirDesinscription(html: string): ResultatDesinscription {
  if (aLienDesinscription(html)) return { html };

  const avertissement = SPAN_VARIABLE.test(html)
    ? "Le modèle contient des balises <span data-type=\"variable\"> au lieu d'un lien {{{RESEND_UNSUBSCRIBE_URL}}} : un pied « Se désinscrire » a été ajouté."
    : "Le modèle ne contient pas de lien {{{RESEND_UNSUBSCRIBE_URL}}} : un pied « Se désinscrire » a été ajouté.";

  const fin = html.search(/<\/body\s*>/i);
  const nouveau = fin >= 0 ? html.slice(0, fin) + PIED_DESINSCRIPTION + html.slice(fin) : html + PIED_DESINSCRIPTION;
  return { html: nouveau, avertissement };
}
