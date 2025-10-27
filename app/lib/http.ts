// app/lib/http.ts
const isServer = typeof window === "undefined";

function joinUrl(base: string, path: string) {
  if (!base) return path.replace(/^\/+/, "/");
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function getBaseUrl() {
  if (!isServer) return ""; // 👉 côté navigateur : URL relative → même origin
  const vercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  const custom = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || null;
  return vercel || custom || "http://localhost:3000";
}

/** Construit un objet URL toujours valide (client + serveur) */
export function buildApiURL(path: string) {
  if (isServer) {
    return new URL(joinUrl(getBaseUrl(), path));
  }
  // client: on reste même origine (pas de CORS) en utilisant window.location.origin
  return new URL(path, window.location.origin);
}

export function apiUrl(path: string) {
  // utile si tu veux juste une string (sans searchParams)
  return isServer ? joinUrl(getBaseUrl(), path) : path;
}


export async function http<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { cache: "no-store", ...init });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { msg = (await res.json() as any)?.error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}
