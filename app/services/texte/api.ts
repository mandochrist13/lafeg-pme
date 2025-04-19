// src/services/api.ts
export interface TexteJuridique {
    id: number;
    titre: string;
    type_texte: string;
    categorie: string;
    description: string | null;
    date_parution: string;
    version: string | null;
    fichier_url: string;
    fichier_nom: string;
    taille_fichier: number;
    mime_type: string;
  }
  
  export async function fetchTextesJuridiques(
    page = 1,
    limit = 10,
    categorie?: string,
    type?: string,
    titre?: string
  ): Promise<{
    data: TexteJuridique[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (categorie) params.append('categorie', categorie);
    if (type) params.append('type_texte', type);
    if (titre) params.append('titre', titre);
  
    const response = await fetch(`/api/texte-juridique?${params.toString()}`, {
      cache: "no-store",
  });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des textes juridiques');
    }
    
    return response.json();
  }