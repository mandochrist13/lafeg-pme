// Recherche, dans les actualités du Guide, d'une publication « ON A LU POUR VOUS »
// téléversée depuis une date donnée (champ createdAt = date du téléversement).
import prisma from "@/lib/prisma";

export const TITRE_PUBLICATION = "lu pour vous";

export async function trouverPublication(depuis: Date): Promise<Date | null> {
  const actualite = await prisma.actualite.findFirst({
    where: {
      titre: { contains: TITRE_PUBLICATION, mode: "insensitive" },
      createdAt: { gte: depuis },
    },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  return actualite?.createdAt ?? null;
}
