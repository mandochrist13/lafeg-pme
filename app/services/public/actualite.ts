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
  const res = await fetch("/api/actualite?page=1&limit=50", { cache: "no-store" })
  if (!res.ok) throw new Error("Erreur de chargement des actualités")
  return res.json() as Promise<{ data: Actualite[] }>
}

export async function fetchActualiteById(id: string) {
  const res = await fetch(`/api/actualite/${id}`)
  if (!res.ok) throw new Error("Article introuvable")
  return res.json() as Promise<Actualite>
}
