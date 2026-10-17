// Service d'accès à /api/institutions
const API_BASE_URL = "/api/institutions";

export interface Institutions {
  id_institution: string;
  nom: string;
  categorie: string;
  type_institution?: string;
  partenaire_feg?: boolean;
  description: string;
  image_url: string;
  image_nom: string;
  taille_image: number;
  image_mime_type: string;
  adresse: string;
  contact: string;
  mail: string;
  site_web: string;
  rs_1?: string;
  rs_2?: string;
  service?: string;
  createdAt: string;
  updatedAt: string;
  imageFile: File | null;
}

/** Champs texte acceptés par l'API (le logo est envoyé séparément sous `image`). */
const CHAMPS = [
  "nom",
  "categorie",
  "type_institution",
  "description",
  "adresse",
  "contact",
  "mail",
  "site_web",
  "rs_1",
  "rs_2",
  "service",
] as const;

/**
 * L'API attend du multipart/form-data (le logo est un fichier), jamais du JSON :
 * un envoi JSON était systématiquement refusé avec une erreur 400.
 */
function versFormData(data: Partial<Institutions>): FormData {
  const formData = new FormData();
  for (const champ of CHAMPS) {
    const valeur = data[champ];
    if (valeur !== undefined && valeur !== null) formData.append(champ, String(valeur));
  }
  if (data.partenaire_feg !== undefined) {
    formData.append("partenaire_feg", String(Boolean(data.partenaire_feg)));
  }
  if (data.imageFile) formData.append("image", data.imageFile);
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

// CREATE - Créer une nouvelle institution
export async function createFinancialInstitution(
  data: Omit<Institutions, "id_institution" | "createdAt" | "updatedAt">
): Promise<Institutions> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    body: versFormData(data),
  });

  if (!response.ok) await lireErreur(response, "Erreur lors de la création");

  const json = await response.json();
  return json.institution ?? json;
}

// READ - Récupérer toutes les institutions
export async function fetchFinancialInstitutions(): Promise<Institutions[]> {
  const response = await fetch(`${API_BASE_URL}?limit=1000`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Erreur HTTP! statut: ${response.status}`);
  }

  const json = await response.json();
  return Array.isArray(json.content) ? json.content : [];
}

// READ - Récupérer une institution par ID (UUID)
export async function fetchFinancialInstitutionById(
  id_institution: string
): Promise<Institutions> {
  const response = await fetch(`${API_BASE_URL}/${id_institution}`);

  if (!response.ok) {
    throw new Error(`Institution non trouvée (ID: ${id_institution})`);
  }

  return response.json();
}

// UPDATE - Mettre à jour une institution
export async function updateFinancialInstitution(
  id_institution: string,
  data: Partial<Institutions>
): Promise<Institutions> {
  const response = await fetch(`${API_BASE_URL}/${id_institution}`, {
    method: "PUT",
    body: versFormData(data),
  });

  if (!response.ok) await lireErreur(response, "Erreur lors de la mise à jour");

  return response.json();
}

// DELETE - Supprimer une institution
export async function deleteFinancialInstitution(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });

  if (!response.ok) await lireErreur(response, "Erreur lors de la suppression");
}

/**
 * Recherche filtrée. L'API ne possède pas de route `/search` :
 * les filtres sont des paramètres de requête sur la liste.
 */
export async function searchFinancialInstitutions(filters: {
  categorie?: string;
  searchTerm?: string;
  type?: string;
}): Promise<Institutions[]> {
  const params = new URLSearchParams({ limit: "1000" });

  if (filters.categorie) params.append("categorie", filters.categorie);
  if (filters.searchTerm) params.append("nom", filters.searchTerm);
  if (filters.type) params.append("type", filters.type);

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Erreur de recherche: ${response.statusText}`);
  }

  const json = await response.json();
  return Array.isArray(json.content) ? json.content : [];
}
