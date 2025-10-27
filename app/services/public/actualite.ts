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

export async function fetchActualites() {
  const res = await fetch(`/api/actualite`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erreur lors du chargement des actualités");
  const json = await res.json();
  return { data: Array.isArray(json.data) ? json.data : [] };
}


export async function fetchActualiteById(id: string) {
  const res = await fetch(`/api/actualite/${id}`)
  if (!res.ok) throw new Error("Article introuvable")
  return res.json() as Promise<Actualite>
}
