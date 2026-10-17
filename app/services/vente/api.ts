// src/services/publiciteApi.ts

import { supabase } from "@/lib/supabase";

const API_BASE_URL = "/api/vente";

// Taille maximale autorisée pour une image de publicité (5 Mo)
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = /^image\/(jpeg|png|gif)$/i;

export interface ImageMeta {
  image_url: string;
  image_nom: string;
  taille_image: number;
  mime_type: string;
}

/**
 * Upload une image directement vers Supabase Storage depuis le navigateur.
 * Cela évite de faire transiter le fichier par la route API (limite Vercel de 4,5 Mo).
 */
export async function uploadPubliciteImage(file: File): Promise<ImageMeta> {
  if (!ALLOWED_IMAGE_TYPES.test(file.type)) {
    throw new Error("L’image doit être au format JPEG, PNG ou GIF.");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("L’image est trop volumineuse (max 5 Mo).");
  }

  const timestamp = Date.now();
  const fileName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
  const filePath = `annonces/${fileName}`;

  const { error } = await supabase.storage.from("feg").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    throw new Error("Échec de l’upload de l’image : " + error.message);
  }

  const { data: urlData } = supabase.storage.from("feg").getPublicUrl(filePath);

  return {
    image_url: urlData.publicUrl,
    image_nom: file.name,
    taille_image: file.size,
    mime_type: file.type,
  };
}

export interface Annonce {
  id_vente: string; // ✅ même nom que dans Prisma
  libelle: string;
  nom_structure: string;
  lien: string | null;
  image_url?: string | null;
  image_nom?: string | null;
  taille_image?: number | null;
  mime_type?: string | null;
  actif: boolean;
  createdAt: string;
  updatedAt: string;
  imageFile: File | null;
}


// CREATE - Créer une nouvelle publicité.
// L'image est déjà uploadée vers Supabase ; on n'envoie que les métadonnées (JSON léger).
export async function createPublicite(payload: {
  libelle: string;
  nom_structure: string;
  lien: string | null;
  actif?: boolean;
} & ImageMeta) {
  const res = await fetch("/api/vente", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error("Erreur lors de la création: " + message);
  }

  return await res.json();
}

// ACTIVER / DÉSACTIVER une publicité
export async function setPubliciteActif(
  id: string,
  actif: boolean
): Promise<Annonce> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ actif }),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error("Erreur lors du changement de statut: " + message);
  }

  return res.json();
}

// DUPLIQUER une publicité (réutilise la même image déjà sur Supabase).
// La copie est créée désactivée pour éviter d'afficher deux pubs identiques.
export async function duplicatePublicite(annonce: Annonce): Promise<Annonce> {
  return createPublicite({
    libelle: annonce.libelle,
    nom_structure: annonce.nom_structure,
    lien: annonce.lien ?? null,
    image_url: annonce.image_url ?? "",
    image_nom: annonce.image_nom ?? "",
    taille_image: annonce.taille_image ?? 0,
    mime_type: annonce.mime_type ?? "image/png",
    actif: false,
  });
}


// READ - Récupérer toutes les publicités
export async function fetchAllPublicites(): Promise<Annonce[]> {
  // On demande une grande limite pour récupérer toutes les publicités
  // (sinon l'API n'en renvoie que 10 par défaut)
  const response = await fetch(`${API_BASE_URL}?limit=1000`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP! statut: ${response.status}`);
  }

  const raw = await response.json();
  const data = Array.isArray(raw) ? raw : raw.data;

  if (!Array.isArray(data)) {
    throw new Error("❌ Les données récupérées ne sont pas un tableau !");
  }

  return data;
}

// READ - Récupérer une publicité par ID
export async function fetchPubliciteById(id: string): Promise<Annonce> {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Publicité non trouvée (ID: ${id})`);
  }

  return response.json();
}

// UPDATE (PUT) - Mettre à jour une publicité.
// L'image (si modifiée) est déjà uploadée vers Supabase ; on envoie des métadonnées JSON.
export async function updatePubliciteWithImage(
  id: string,
  payload: {
    libelle: string;
    nom_structure: string;
    lien: string | null;
  } & Partial<ImageMeta>
): Promise<Annonce> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(`Erreur lors de la mise à jour: ${message}`);
  }

  return response.json();
}

// PATCH - Mise à jour partielle
export async function patchPublicite(id: string, data: Partial<Annonce>) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur PATCH: ${response.statusText}`);
  }

  return response.json();
}

// DELETE - Supprimer une publicité
export async function deletePublicite(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression: ${response.statusText}`);
  }
}
