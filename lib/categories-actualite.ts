// Catégories d'actualités, partagées entre le formulaire admin et les filtres publics
// (auparavant les deux listes différaient : « Événement » côté admin, « Événements » côté public,
// ce qui rendait le filtre et la mise en avant inopérants).
export const CATEGORIES_ACTUALITE = [
  "Événement",
  "Publication",
  "Législation",
  "Réglementation",
  "Financement",
  "Formation",
  "Innovation",
  "Commerce",
  "Autres",
] as const;

export type CategorieActualite = (typeof CATEGORIES_ACTUALITE)[number];

/** Catégorie mise en avant dans la section « À la une » de la page Actualités. */
export const CATEGORIE_A_LA_UNE: CategorieActualite = "Événement";
