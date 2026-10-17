// Numérotation des campagnes « ON A LU POUR VOUS VOL. <numéro> ».

export const PREFIXE_VOLUME = "ON A LU POUR VOUS VOL.";

export type SourceVolume = "document" | "campagnes" | "depart";

export const LIBELLE_SOURCE: Record<SourceVolume, string> = {
  document: "numéro indiqué sur le document téléversé",
  campagnes: "dernière campagne envoyée ou programmée + 1",
  depart: "REVUE_VOLUME_DEPART (aucune campagne numérotée existante)",
};

// « Vol. 34 », « VOL 34 », « Volume 34 », « vol-34 », « vol_34 », « Vol. n° 34 »
const VOLUME = /(?:^|[^a-z])vol(?:ume)?[\s._-]*(?:n[°º][\s._-]*)?(\d{1,4})(?!\d)/i;
// « N° 34 », seulement dans un titre
const NUMERO = /n[°º]\s*(\d{1,4})(?!\d)/i;
const NOM_CAMPAGNE = /^ON A LU POUR VOUS VOL\.\s*(\d+)/i;

/** Dernier segment d'une URL ou d'un chemin, décodé. */
function nomFichier(url: string): string {
  const segment = url.split(/[?#]/)[0].split("/").pop() ?? "";
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export interface DocumentGuide {
  titre: string;
  fichiers?: (string | null | undefined)[];
}

/** Numéro de volume porté par le document (titre, puis noms de fichiers), ou null. */
export function volumeDuDocument(doc: DocumentGuide): number | null {
  const titre = doc.titre.match(VOLUME) ?? doc.titre.match(NUMERO);
  if (titre) return Number(titre[1]);
  for (const f of doc.fichiers ?? []) {
    if (!f) continue;
    const m = nomFichier(f).match(VOLUME);
    if (m) return Number(m[1]);
  }
  return null;
}

/** Numéro de volume d'un nom de campagne « ON A LU POUR VOUS VOL. 34 — … », ou null. */
export function volumeDeCampagne(nom: string | null | undefined): number | null {
  const m = nom?.match(NOM_CAMPAGNE);
  return m ? Number(m[1]) : null;
}

/** Une campagne compte si elle est envoyée ou programmée (ni brouillon, ni annulée). */
export function campagneActive(statut: string): boolean {
  return statut !== "draft" && !/cancel/i.test(statut);
}

export function determinerVolume(
  doc: DocumentGuide,
  campagnes: { name: string; status: string }[],
  depart: number
): { volume: number; source: SourceVolume } {
  const duDocument = volumeDuDocument(doc);
  if (duDocument !== null) return { volume: duDocument, source: "document" };

  const numeros = campagnes
    .filter((c) => campagneActive(c.status))
    .map((c) => volumeDeCampagne(c.name))
    .filter((n): n is number => n !== null);
  if (numeros.length) return { volume: Math.max(...numeros) + 1, source: "campagnes" };

  return { volume: depart, source: "depart" };
}
