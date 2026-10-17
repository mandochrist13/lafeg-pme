// Garde d'authentification pour les routes API qui modifient des données.
// Les routes GET restent publiques (le site vitrine les consomme).
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Renvoie une réponse 401 si aucun administrateur n'est connecté, sinon `null`.
 *
 * Usage :
 *   const refus = await exigerAdmin();
 *   if (refus) return refus;
 */
export async function exigerAdmin(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Non autorisé : connexion administrateur requise." },
      { status: 401 }
    );
  }
  return null;
}
