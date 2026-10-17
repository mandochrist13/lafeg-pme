export type Actualite = {
  id: string
  titre: string
  contenu: string
  imageUrl?: string | null
  datePub: string
  categorie?: string | null
  source?: string | null
  lienSource?: string | null
}

export type PaginationActualites = {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Charge les actualités publiées.
 *
 * Sans `limit`, l'API n'en renvoie que 10 : la page publique ne montrait donc
 * jamais les actualités plus anciennes. On récupère ici l'ensemble, ce qui
 * permet au passage de filtrer, compter par catégorie et paginer côté client
 * sur la totalité du fonds.
 */
export async function fetchActualites(limit = 1000): Promise<{
  data: Actualite[]
  pagination?: PaginationActualites
}> {
  const res = await fetch(`/api/actualite?limit=${limit}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erreur lors du chargement des actualités");
  const json = await res.json();
  return {
    data: Array.isArray(json.data) ? json.data : [],
    pagination: json.pagination,
  };
}


export async function fetchActualiteById(id: string) {
  const res = await fetch(`/api/actualite/${id}`)
  if (!res.ok) throw new Error("Article introuvable")
  return res.json() as Promise<Actualite>
}
