// Helpers partagés par les routes /api/offres (un fichier route.ts ne doit
// exporter que des handlers HTTP, d'où ce module séparé).
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { nomFichierSur } from "@/lib/api-utils";

export const STATUTS_OFFRE = ["ACTIF", "INACTIF", "ARCHIVE"] as const;
export type StatutOffre = (typeof STATUTS_OFFRE)[number];

export const CHAMPS_TEXTE_OFFRE = [
  "titre_offre",
  "nom_structure",
  "type_offre",
  "contact",
  "email",
  "localisation",
  "site_web",
  "description",
] as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Téléverse un fichier dans `offres/` et renvoie son nom et son URL publique. */
export async function televerserFichierOffre(file: File) {
  const nom = nomFichierSur(file.name);
  const chemin = `offres/${nom}`;
  const { error } = await supabase.storage
    .from("feg")
    .upload(chemin, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) throw new Error(error.message);
  return { nom, url: supabase.storage.from("feg").getPublicUrl(chemin).data.publicUrl };
}

/** Supprime un fichier du dossier `offres/` (sans faire échouer la requête). */
export async function supprimerFichierOffre(nom: string | null | undefined) {
  if (!nom) return;
  const { error } = await supabase.storage.from("feg").remove([`offres/${nom}`]);
  if (error) console.error("Erreur suppression fichier offre :", error);
}

/** Lit le corps (multipart ou JSON) et sépare champs et fichiers. */
export async function lireCorpsOffre(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  const body: Record<string, any> = {};
  const files: Record<string, File> = {};

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size > 0) files[key] = value;
      } else {
        body[key] = value;
      }
    }
  } else {
    Object.assign(body, await req.json());
  }
  return { body, files };
}

/** Vérifie les types des fichiers d'une offre ; renvoie un message d'erreur ou `null`. */
export function validerFichiersOffre(files: Record<string, File>): string | null {
  if (files.image && !/^image\/(jpeg|png)$/.test(files.image.type)) {
    return "Le logo doit être au format JPEG ou PNG";
  }
  if (files.banniere && !/^image\/(jpeg|png)$/.test(files.banniere.type)) {
    return "La bannière doit être au format JPEG ou PNG";
  }
  if (files.fichier && files.fichier.type !== "application/pdf") {
    return "Seuls les fichiers PDF sont acceptés";
  }
  return null;
}
