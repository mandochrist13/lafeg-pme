// src/services/api.ts
const API_BASE_URL = "/api/FinancialInstitution";

export interface FinancialInstitution {
  id_institutionFinanciere: string;
  nom: string;
  categorie: string;
  type_institution: string;
  partenaire_feg?: boolean;
  description: string;
  logo: string;
  adresse: string;
  contact: string;
  mail: string;
  site_web: string;
  rs_1?: string;
  rs_2?: string;
  service?: string;
  createdAt: string;
  updatedAt: string;
}

// CREATE - Créer une nouvelle institution
export async function createFinancialInstitution(
  data: Omit<FinancialInstitution, 'id_institutionFinanciere' | 'createdAt' | 'updatedAt'>
): Promise<FinancialInstitution> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la création: ${response.statusText}`);
  }

  return response.json();
}

// READ - Récupérer toutes les institutions
export async function fetchFinancialInstitutions(): Promise<FinancialInstitution[]> {
  const response = await fetch(API_BASE_URL);
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP! statut: ${response.status}`);
  }
  
  return response.json();
}

// READ - Récupérer une institution par ID
export async function fetchFinancialInstitutionById(
  id: number
): Promise<FinancialInstitution> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`Institution non trouvée (ID: ${id})`);
  }
  
  return response.json();
}

// UPDATE - Mettre à jour une institution
export async function updateFinancialInstitution(
  id: string,
  data: Partial<FinancialInstitution>
): Promise<FinancialInstitution> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour: ${response.statusText}`);
  }

  return response.json();
}

// DELETE - Supprimer une institution
export async function deleteFinancialInstitution(
  id: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression: ${response.statusText}`);
  }
}

// Recherche avancée avec filtres optionnels
export async function searchFinancialInstitutions(
  filters: {
    categorie?: FinancialInstitution['categorie'];
    searchTerm?: string;
    partenaireFeg?: boolean;
  }
): Promise<FinancialInstitution[]> {
  const params = new URLSearchParams();
  
  if (filters.categorie) params.append('categorie', filters.categorie);
  if (filters.searchTerm) params.append('search', filters.searchTerm);
  if (filters.partenaireFeg !== undefined) params.append('partenaire_feg', String(filters.partenaireFeg));

  const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Erreur de recherche: ${response.statusText}`);
  }
  
  return response.json();
}