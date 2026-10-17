import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Archive les offres dont la date de fin est passée.
 *
 * Appelée chaque nuit par Vercel Cron (voir `vercel.json`), qui envoie
 * « Authorization: Bearer $CRON_SECRET ». L'ancien en-tête `x-api-key`
 * (MY_SECRET_API_KEY) reste accepté pour les appels manuels.
 */
async function archiver(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const apiKey = process.env.MY_SECRET_API_KEY;
  const autorise =
    (!!cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`) ||
    (!!apiKey && req.headers.get("x-api-key") === apiKey);

  if (!autorise) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const now = new Date();
    const result = await prisma.offre.updateMany({
      where: {
        date_fin: { lt: now },
        statut: { not: "ARCHIVE" },
      },
      data: { statut: "ARCHIVE" },
    });

    return NextResponse.json({
      message: "Archivage terminé",
      nb_offres_archivees: result.count,
    });
  } catch (error) {
    console.error("Erreur archivage des offres expirées :", error);
    return NextResponse.json({ error: "Erreur serveur lors de l'archivage" }, { status: 500 });
  }
}

// Vercel Cron appelle la route en GET ; POST reste disponible pour les appels manuels.
export const GET = archiver;
export const POST = archiver;
