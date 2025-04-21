// src/services/api.ts
export interface TexteJuridique {
    id: string;
    titre: string;
    type_texte: string;
    categorie: string;
    description?: string;
    date_parution: string;
    version?: string | null;
    fichier: File | null;
    fichier_url: string;
    fichier_nom?: string;
    taille_fichier: number;
    mime_type?: string;
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

  
    const appendIfDefined = (key: string, value?: string) => {
      if (value) params.append(key, value);
    };
    
    appendIfDefined('categorie', categorie);
    appendIfDefined('type_texte', type);
    appendIfDefined('titre', titre);
    

    try {
      const response = await fetch(`/api/texte-juridique?${params.toString()}`, {
        cache: "no-store",
      });
    
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }
    
      return response.json();
    } catch (error) {
      console.error("Erreur API fetchTextesJuridiques :", error);
      throw error;
    }
    
  }


  // POST - Créer un texte juridique

  export async function createTexteJuridique(
    texte: Omit<TexteJuridique, "id">
  ): Promise<TexteJuridique> {
    try {
      const response = await fetch("/api/texte-juridique", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(texte),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur création : ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Erreur API createTexteJuridique :", error);
      throw error;
    }
  }
  

  // PUT - Mettre à jour un texte juridique
  export async function updateTexteJuridique(
    id: string,
    updatedTexte: Partial<TexteJuridique>
  ): Promise<TexteJuridique> {
    try {
      const response = await fetch(`/api/texte-juridique/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTexte),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur mise à jour : ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Erreur API updateTexteJuridique :", error);
      throw error;
    }
  }
  

  // DELETE - Supprimer un texte juridique
  export async function deleteTexteJuridique(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/texte-juridique/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Erreur suppression : ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur API deleteTexteJuridique :", error);
      throw error;
    }
  }
  