import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { estUuid, lireDate } from "@/lib/api-utils";
import {
  CHAMPS_TEXTE_OFFRE,
  EMAIL_REGEX,
  STATUTS_OFFRE,
  type StatutOffre,
  lireCorpsOffre,
  supprimerFichierOffre,
  televerserFichierOffre,
  validerFichiersOffre,
} from "@/lib/offres-api";

type Contexte = { params: Promise<{ id: string }> };

/**
 * @swagger
 * /api/offres/{id}:
 *   get:
 *     tags: [Offres]
 *     summary: Récupérer une offre par son ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Offre récupérée avec succès
 *       404:
 *         description: Offre non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest, context: Contexte) {
  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ success: false, error: "Format d'ID invalide" }, { status: 400 });
    }
    const offre = await prisma.offre.findUnique({ where: { id_offre: id } });
    if (!offre) {
      return NextResponse.json({ success: false, error: "Offre non trouvée" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: offre });
  } catch (error) {
    console.error("Erreur GET /api/offres/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la récupération de l'offre" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/offres/{id}:
 *   put:
 *     tags: [Offres]
 *     summary: Mettre à jour une offre existante
 *     description: |
 *       Mise à jour partielle (seuls les champs fournis sont modifiés). Les fichiers
 *       `image`, `banniere` et `fichier` remplacent les anciens s'ils sont fournis.
 *       Authentification administrateur requise.
 *     responses:
 *       200:
 *         description: Offre mise à jour avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Offre non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ success: false, error: "Format d'ID invalide" }, { status: 400 });
    }

    const { body, files } = await lireCorpsOffre(request);

    const offreExistante = await prisma.offre.findUnique({ where: { id_offre: id } });
    if (!offreExistante) {
      return NextResponse.json({ success: false, error: "Offre non trouvée" }, { status: 404 });
    }

    // Validation AVANT toute suppression / téléversement (l'ancien code supprimait
    // l'ancien PDF avant de vérifier le type du nouveau).
    const erreurFichier = validerFichiersOffre(files);
    if (erreurFichier) {
      return NextResponse.json({ success: false, error: erreurFichier }, { status: 400 });
    }

    const data: Record<string, any> = {};

    for (const champ of CHAMPS_TEXTE_OFFRE) {
      if (typeof body[champ] === "string") data[champ] = body[champ].trim();
    }
    if (typeof data.email === "string" && !EMAIL_REGEX.test(data.email)) {
      return NextResponse.json({ success: false, error: "Email invalide" }, { status: 400 });
    }

    if (body.membre_feg !== undefined) {
      data.membre_feg = body.membre_feg === "true" || body.membre_feg === true;
    }

    if (body.statut !== undefined) {
      if (!STATUTS_OFFRE.includes(body.statut as StatutOffre)) {
        return NextResponse.json(
          { success: false, error: `Statut invalide (attendu : ${STATUTS_OFFRE.join(", ")})` },
          { status: 400 }
        );
      }
      data.statut = body.statut;
    }

    const dateDebut = body.date_debut ? lireDate(body.date_debut) : offreExistante.date_debut;
    const dateFin = body.date_fin ? lireDate(body.date_fin) : offreExistante.date_fin;
    if (!dateDebut || !dateFin) {
      return NextResponse.json({ success: false, error: "Date invalide" }, { status: 400 });
    }
    if (dateDebut >= dateFin) {
      return NextResponse.json(
        { success: false, error: "La date de fin doit être postérieure à la date de début" },
        { status: 400 }
      );
    }
    data.date_debut = dateDebut;
    data.date_fin = dateFin;

    // Fichiers : on téléverse le nouveau puis on supprime l'ancien.
    if (files.image) {
      const r = await televerserFichierOffre(files.image);
      data.image_url = r.url;
      data.image_nom = r.nom;
      await supprimerFichierOffre(offreExistante.image_nom);
    }
    if (files.banniere) {
      const r = await televerserFichierOffre(files.banniere);
      data.bannier_url = r.url;
      data.bannier_nom = r.nom;
      await supprimerFichierOffre(offreExistante.bannier_nom);
    }
    if (files.fichier) {
      const r = await televerserFichierOffre(files.fichier);
      data.fichier_url = r.url;
      data.fichier_nom = r.nom;
      await supprimerFichierOffre(offreExistante.fichier_nom);
    }

    const updated = await prisma.offre.update({ where: { id_offre: id }, data });
    return NextResponse.json({ success: true, data: updated, message: "Offre mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur PUT /api/offres/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la mise à jour de l'offre" },
      { status: 500 }
    );
  }
}

// PATCH - Mise à jour partielle d'une offre (ex: (ré)activer / désactiver / archiver)
export async function PATCH(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ success: false, error: "Format d'ID invalide" }, { status: 400 });
    }

    const offre = await prisma.offre.findUnique({ where: { id_offre: id } });
    if (!offre) {
      return NextResponse.json({ success: false, error: "Offre non trouvée" }, { status: 404 });
    }

    const body = await request.json();
    const data: any = {};

    if (body.statut !== undefined) {
      if (!STATUTS_OFFRE.includes(body.statut)) {
        return NextResponse.json({ success: false, error: "Statut invalide" }, { status: 400 });
      }
      data.statut = body.statut;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { success: false, error: "Aucun champ valide à mettre à jour" },
        { status: 400 }
      );
    }

    const updated = await prisma.offre.update({ where: { id_offre: id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour partielle de l'offre:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la mise à jour de l'offre" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/offres/{id}:
 *   delete:
 *     tags: [Offres]
 *     summary: Supprimer définitivement une offre et ses fichiers
 *     responses:
 *       200:
 *         description: Offre supprimée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Offre non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function DELETE(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ success: false, error: "Format d'ID invalide" }, { status: 400 });
    }

    const offre = await prisma.offre.findUnique({ where: { id_offre: id } });
    if (!offre) {
      return NextResponse.json({ success: false, error: "Offre non trouvée" }, { status: 404 });
    }

    await prisma.offre.delete({ where: { id_offre: id } });

    await supprimerFichierOffre(offre.image_nom);
    await supprimerFichierOffre(offre.bannier_nom);
    await supprimerFichierOffre(offre.fichier_nom);

    return NextResponse.json({ success: true, message: "Offre supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la suppression de l'offre" },
      { status: 500 }
    );
  }
}
