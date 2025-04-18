// src/services/api.ts
const API_BASE_URL = "/api/FinancialInstitution"; // Utilise le chemin relatif puisque c'est votre propre API Next.js

export interface FinancialInstitution {
  id: number;
  nom: string;
  categorie: "banque" | "microfinance" | "fonds" | "institution_publique";
  type_institution: string;
  partenaire_feg?: string;
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

export async function fetchFinancialInstitutions(): Promise<FinancialInstitution[]> {
  const response = await fetch(API_BASE_URL);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}