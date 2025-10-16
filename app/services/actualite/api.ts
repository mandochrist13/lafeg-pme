// app/services/actualite/api.ts
export type Actualite = {
  id: string
  titre: string
  contenu: string
  imageUrl?: string | null
  datePub: string // ISO
  createdAt: string // ISO
  updatedAt: string // ISO
  categorie?: string | null
  source?: string | null
  lienSource?: string | null
}

export type PageMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ListResponse<T> = {
  data: T[]
  pagination: PageMeta
}

type ListParams = {
  page?: number
  limit?: number
  categorie?: string
}

const BASE = "/api/actualite"

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    // si besoin d’auth cookies cred:
    // credentials: "include",
  })
  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try {
      const j = await res.json()
      msg = j?.error || msg
    } catch {}
    throw new Error(msg)
  }
  return res.json()
}

// LIST (GET /api/actualite?page=&limit=&categorie=)
export async function listActualites(params: ListParams = {}): Promise<ListResponse<Actualite>> {
  const url = new URL(BASE, window.location.origin)
  if (params.page) url.searchParams.set("page", String(params.page))
  if (params.limit) url.searchParams.set("limit", String(params.limit))
  if (params.categorie && params.categorie !== "all" && params.categorie !== "") {
    url.searchParams.set("categorie", params.categorie)
  }
  return http(url.toString())
}

// GET ONE (GET /api/actualite/[id])
export async function getActualite(id: string): Promise<Actualite> {
  return http(`${BASE}/${id}`)
}

// CREATE (POST /api/actualite) -> multipart/form-data
export async function createActualite(payload: {
  titre: string
  contenu: string
  categorie?: string
  source?: string
  lienSource?: string
  imageFile?: File | null
}): Promise<Actualite> {
  const fd = new FormData()
  fd.set("titre", payload.titre)
  fd.set("contenu", payload.contenu)
  if (payload.categorie) fd.set("categorie", payload.categorie)
  if (payload.source) fd.set("source", payload.source)
  if (payload.lienSource) fd.set("lienSource", payload.lienSource)
  if (payload.imageFile) fd.set("image", payload.imageFile)

  return http<Actualite>(BASE, {
    method: "POST",
    body: fd,
  })
}

// UPDATE (PUT /api/actualite/[id]) -> multipart/form-data
export async function updateActualite(
  id: string,
  payload: {
    titre?: string
    contenu?: string
    categorie?: string
    source?: string
    lienSource?: string
    imageFile?: File | null
  }
): Promise<Actualite> {
  const fd = new FormData()
  if (payload.titre != null) fd.set("titre", payload.titre)
  if (payload.contenu != null) fd.set("contenu", payload.contenu)
  if (payload.categorie != null) fd.set("categorie", payload.categorie)
  if (payload.source != null) fd.set("source", payload.source)
  if (payload.lienSource != null) fd.set("lienSource", payload.lienSource)
  if (payload.imageFile) fd.set("image", payload.imageFile)

  return http<Actualite>(`${BASE}/${id}`, {
    method: "PUT",
    body: fd,
  })
}

// DELETE (DELETE /api/actualite/[id])
export async function deleteActualite(id: string): Promise<{ message: string }> {
  return http(`${BASE}/${id}`, { method: "DELETE" })
}
