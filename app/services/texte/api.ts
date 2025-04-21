// src/services/api.ts
export interface TexteJuridique {
    id_texteJuridique: string;
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
    texte: Omit<TexteJuridique, "id_texteJuridique" | "fichier_url" | "fichier_nom" | "taille_fichier" | "mime_type"> & { fichier: File }
  ): Promise<TexteJuridique> {
    try {
      const formData = new FormData();
      formData.append("titre", texte.titre);
      formData.append("categorie", texte.categorie);
      formData.append("type_texte", texte.type_texte);
      formData.append("description", texte.description || "");
      formData.append("date_parution", texte.date_parution);
      formData.append("version", texte.version || "");
      if (!texte.fichier) {
        alert("Fichier requis !");
        return Promise.reject("Fichier requis !");
      }
      formData.append("fichier", texte.fichier); // le fichier PDF


      const response = await fetch("/api/texte-juridique", {
        method: "POST",
        
        body: formData,
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
    id_texteJuridique: string,
    formData: FormData
  ): Promise<TexteJuridique> {
    try {
      const response = await fetch(`/api/texte-juridique/${id_texteJuridique}`, {
        method: "PUT",
        body: formData,
        // Note: Ne pas mettre 'Content-Type' header quand on envoie FormData
        // Le navigateur va automatiquement ajouter le bon content-type avec le boundary
      });
  
      if (!response.ok) {
        throw new Error(`Erreur mise à jour : ${response.status}`);
      }
  
      return await response.json();
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
  