import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { cheminStorageDepuisUrl, estUuid, fichierFourni, nomFichierSur } from "@/lib/api-utils";

type Contexte = { params: Promise<{ id_institution: string }> };

const CHAMPS_TEXTE = [
  "nom",
  "categorie",
  "type_institution",
  "description",
  "adresse",
  "contact",
  "mail",
  "site_web",
  "rs_1",
  "rs_2",
  "service",
] as const;

/** Supprime l'ancien logo à partir de son URL (plus fiable que `image_nom`, qui a parfois l'ancien nom brut). */
async function supprimerLogo(inst: { image_url: string | null; image_nom: string | null }) {
  const chemin =
    cheminStorageDepuisUrl(inst.image_url) ??
    (inst.image_nom ? `institution-financiere/${inst.image_nom}` : null);
  if (!chemin) return;
  const { error } = await supabase.storage.from("feg").remove([chemin]);
  if (error) console.error("Erreur lors de la suppression de l'ancien logo:", error);
}

/**
 * @swagger
 * /api/institutions/{id_institution}:
 *   get:
 *     summary: Récupère une institution par son ID
 *     tags: [Institutions]
 *     parameters:
 *       - in: path
 *         name: id_institution
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Détails de l'institution
 *       400:
 *         description: Format d'ID invalide
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest, context: Contexte) {
  const { id_institution } = await context.params;

  if (!estUuid(id_institution)) {
    return NextResponse.json({ error: "ID invalide (format UUID attendu)." }, { status: 400 });
  }

  try {
    const institution = await prisma.institutions.findUnique({ where: { id_institution } });
    if (!institution) {
      return NextResponse.json({ error: "Institution non trouvée." }, { status: 404 });
    }
    return NextResponse.json(institution, { status: 200 });
  } catch (error) {
    console.error("Erreur GET /api/institutions/[id_institution]:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/institutions/{id_institution}:
 *   put:
 *     summary: Met à jour une institution existante (multipart/form-data)
 *     tags: [Institutions]
 *     responses:
 *       200:
 *         description: Institution mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id_institution } = await context.params;
    if (!estUuid(id_institution)) {
      return NextResponse.json({ error: "ID invalide (format UUID attendu)." }, { status: 400 });
    }

    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Le contenu doit être de type multipart/form-data" },
        { status: 400 }
      );
    }

    const existingInstitution = await prisma.institutions.findUnique({ where: { id_institution } });
    if (!existingInstitution) {
      return NextResponse.json({ error: "Institution non trouvée" }, { status: 404 });
    }

    const formData = await request.formData();
    const updates: any = {};

    for (const field of CHAMPS_TEXTE) {
      const value = formData.get(field);
      if (value !== null) updates[field] = value as string;
    }

    const partenaire_feg = formData.get("partenaire_feg");
    if (partenaire_feg !== null) updates.partenaire_feg = partenaire_feg === "true";

    const logo = formData.get("image");
    if (fichierFourni(logo)) {
      // Vérification AVANT de supprimer l'ancien logo.
      if (!logo.type.match(/^image\/(jpeg|png)$/)) {
        return NextResponse.json(
          { error: "Le logo doit être au format JPEG ou PNG" },
          { status: 400 }
        );
      }

      const fileName = nomFichierSur(logo.name);
      const filePath = `institution-financiere/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("feg")
        .upload(filePath, logo, { cacheControl: "3600", upsert: false, contentType: logo.type });

      if (uploadError) {
        console.error("Erreur lors de l'upload du logo:", uploadError);
        return NextResponse.json({ error: "Erreur lors de l'upload du logo" }, { status: 500 });
      }

      updates.image_url = supabase.storage.from("feg").getPublicUrl(filePath).data.publicUrl;
      updates.image_nom = fileName;
      updates.taille_image = logo.size;
      updates.image_mime_type = logo.type;

      await supprimerLogo(existingInstitution);
    }

    const updatedInstitution = await prisma.institutions.update({
      where: { id_institution },
      data: updates,
    });

    return NextResponse.json(updatedInstitution);
  } catch (error) {
    console.error("Erreur PUT /api/institutions/[id]:", error);
    return NextResponse.json({ error: "Erreur Interne du Serveur" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/institutions/{id_institution}:
 *   delete:
 *     summary: Supprime une institution et son logo
 *     tags: [Institutions]
 *     responses:
 *       200:
 *         description: Institution supprimée avec succès
 *       400:
 *         description: Format d'ID invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function DELETE(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  const { id_institution } = await context.params;
  if (!estUuid(id_institution)) {
    return NextResponse.json({ error: "ID invalide (format UUID attendu)." }, { status: 400 });
  }

  try {
    const existing = await prisma.institutions.findUnique({ where: { id_institution } });
    if (!existing) {
      return NextResponse.json({ error: "Institution non trouvée" }, { status: 404 });
    }

    await prisma.institutions.delete({ where: { id_institution } });
    await supprimerLogo(existing);

    return NextResponse.json({ message: "Institution supprimée" });
  } catch (error) {
    console.error("Erreur DELETE /api/institutions/[id_institution]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
