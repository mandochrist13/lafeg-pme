// Service d'accès à /api/sea (structures d'encadrement et d'accompagnement)
const API_BASE_URL = "/api/sea";

export interface SEA {
  id_sea: string;
  nom: string;
  description: string;
  type_sea: string;
  categorie: string;
  services: string[];
  adresse: string;
  contact?: string | null;
  mail?: string | null;
  site_web?: string | null;
  rs_1?: string | null;
  rs_2?: string | null;
  logo_url?: string | null;
  logo_nom?: string | null;
  logoFile?: File | null;
  partenaire_feg?: boolean;
  createdAt: string;
  updatedAt: string;
}

const CHAMPS = [
  "nom",
  "description",
  "type_sea",
  "categorie",
  "adresse",
  "contact",
  "mail",
  "site_web",
  "rs_1",
  "rs_2",
] as const;

/**
 * L'API attend du multipart/form-data pour la création et la mise à jour
 * complète (le logo est un fichier) : un envoi JSON était refusé en 400.
 * Le champ fichier s'appelle `image` à la création et `logo` à la modification.
 */
function versFormData(data: Partial<SEA>, champFichier: "image" | "logo"): FormData {
  const formData = new FormData();
  for (const champ of CHAMPS) {
    const valeur = data[champ];
    if (valeur !== undefined && valeur !== null) formData.append(champ, String(valeur));
  }
  if (data.services) formData.append("services", JSON.stringify(data.services));
  if (data.partenaire_feg !== undefined) {
    formData.append("partenaire_feg", String(Boolean(data.partenaire_feg)));
  }
  if (data.logoFile) formData.append(champFichier, data.logoFile);
  return formData;
}

async function lireErreur(response: Response, defaut: string): Promise<never> {
  let message = defaut;
  try {
    const json = await response.json();
    message = json?.error || json?.erreur || defaut;
  } catch {
    // réponse sans corps JSON
  }
  throw new Error(message);
}

// CREATE - Créer une nouvelle SEA
export async function createSEA(
  data: Omit<SEA, "id_sea" | "createdAt" | "updatedAt">
): Promise<SEA> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    body: versFormData(data, "image"),
  });

  if (!response.ok) await lireErreur(response, "Erreur lors de la création");

  return response.json();
}

// READ - Récupérer toutes les SEA
export async function fetchAllSEAs(): Promise<SEA[]> {
  const response = await fetch(`${API_BASE_URL}?limit=1000`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Erreur HTTP! statut: ${response.status}`);
  }

  const raw = await response.json();
  const data = Array.isArray(raw) ? raw : raw.data;

  return Array.isArray(data) ? data : [];
}

// READ - Récupérer une SEA par ID
export async function fetchSEAById(id: string): Promise<SEA> {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`SEA non trouvée (ID: ${id})`);
  }

  return response.json();
}

// UPDATE (PUT) - Mise à jour complète (multipart, logo facultatif)
export async function updateSEA(id: string, data: Partial<SEA>): Promise<SEA> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    body: versFormData(data, "logo"),
  });

  if (!response.ok) await lireErreur(response, "Erreur lors de la mise à jour");

  return response.json();
}

// PATCH - Mise à jour partielle (JSON, sans logo)
export async function patchSEA(id: string, data: Partial<SEA>): Promise<SEA> {
  const { logoFile, ...champs } = data;
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(champs),
  });

  if (!response.ok) await lireErreur(response, "Erreur lors de la modification partielle");

  return response.json();
}

// DELETE - Supprimer une SEA
export async function deleteSEA(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });

  if (!response.ok) await lireErreur(response, "Erreur lors de la suppression");
}
