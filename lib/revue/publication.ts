// Recherche, dans les actualités du Guide, de la publication « ON A LU POUR VOUS »
// téléversée depuis une date donnée (champ createdAt = date du téléversement).
import prisma from "@/lib/prisma";
import type { PublicationGuide } from "./run";

export const TITRE_PUBLICATION = "lu pour vous";

export async function trouverPublication(depuis: Date): Promise<PublicationGuide | null> {
  const actualite = await prisma.actualite.findFirst({
    where: {
      titre: { contains: TITRE_PUBLICATION, mode: "insensitive" },
      createdAt: { gte: depuis },
    },
    orderBy: { createdAt: "desc" },
    select: { titre: true, imageUrl: true, lienSource: true, createdAt: true },
  });
  if (!actualite) return null;
  // Le numéro de volume est cherché dans le titre, puis dans le fichier téléversé et le lien source.
  return { titre: actualite.titre, fichiers: [actualite.imageUrl, actualite.lienSource], createdAt: actualite.createdAt };
}
