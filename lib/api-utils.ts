// Petits utilitaires partagés par les routes API.

const UUID_REGEX =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

/** Vrai si la chaîne est un UUID (format utilisé par toutes les tables). */
export function estUuid(valeur: string | undefined | null): valeur is string {
  return typeof valeur === "string" && /^[0-9a-f-]{36}$/i.test(valeur) && UUID_REGEX.test(valeur);
}

/**
 * Extrait l'UUID d'un identifiant qui peut être soit l'UUID brut, soit un
 * slug de la forme `mon-titre-<uuid>`. Renvoie `null` si aucun UUID n'est trouvé.
 */
export function extraireUuid(valeur: string): string | null {
  const m = valeur.match(UUID_REGEX);
  return m ? m[0] : null;
}

export interface Pagination {
  page: number;
  limit: number;
  skip: number;
}

/**
 * Lit `page` et `limit` dans les paramètres de requête en garantissant des
 * entiers valides (évite les `NaN` qui font planter Prisma).
 */
export function lirePagination(
  searchParams: URLSearchParams,
  options: { limitDefaut?: number; limitMax?: number } = {}
): Pagination {
  const { limitDefaut = 10, limitMax = 1000 } = options;
  const pageBrut = parseInt(searchParams.get("page") ?? "", 10);
  const limitBrut = parseInt(searchParams.get("limit") ?? "", 10);
  const page = Number.isFinite(pageBrut) && pageBrut >= 1 ? pageBrut : 1;
  const limit =
    Number.isFinite(limitBrut) && limitBrut >= 1
      ? Math.min(limitBrut, limitMax)
      : limitDefaut;
  return { page, limit, skip: (page - 1) * limit };
}

/** Lit un champ de tri en le restreignant à une liste blanche. */
export function lireTri(
  searchParams: URLSearchParams,
  champsAutorises: readonly string[],
  defaut: string
): { champ: string; ordre: "asc" | "desc" } {
  const demande = searchParams.get("sort");
  const champ = demande && champsAutorises.includes(demande) ? demande : defaut;
  const ordre = searchParams.get("order") === "asc" ? "asc" : "desc";
  return { champ, ordre };
}

/** Un `File` réellement fourni (les champs de fichier vides arrivent avec une taille 0). */
export function fichierFourni(valeur: FormDataEntryValue | null): valeur is File {
  return valeur instanceof File && valeur.size > 0;
}

/**
 * Chemin d'un objet dans le bucket `feg` à partir de son URL publique Supabase,
 * ou `null` si l'URL n'en est pas une. Sert à supprimer les anciens fichiers.
 */
export function cheminStorageDepuisUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const marqueur = "/object/public/feg/";
  const i = url.indexOf(marqueur);
  if (i === -1) return null;
  try {
    return decodeURIComponent(url.slice(i + marqueur.length).split("?")[0]);
  } catch {
    return null;
  }
}

/** Date valide à partir d'une chaîne, ou `null`. */
export function lireDate(valeur: unknown): Date | null {
  if (typeof valeur !== "string" || !valeur.trim()) return null;
  const d = new Date(valeur);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Nom de fichier sûr pour Supabase Storage (sans accents ni caractères spéciaux). */
export function nomFichierSur(nom: string): string {
  const propre = nom
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${Date.now()}-${propre || "fichier"}`;
}
