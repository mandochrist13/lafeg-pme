import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { cheminStorageDepuisUrl, estUuid, fichierFourni, nomFichierSur } from "@/lib/api-utils";

type Contexte = { params: Promise<{ id: string }> };

const CHAMPS_TEXTE = [
  "nom",
  "description",
  "type_sea",
  "categorie",
  "adresse",
  "contact",
  "mail",
  "site_web",
  "rs_1",
  "rs_2",
] as const;

/** Supprime l'ancien logo à partir de son URL (plus fiable que `logo_nom`, qui a parfois l'ancien nom brut). */
async function supprimerLogo(sea: { logo_url: string | null; logo_nom: string | null }) {
  const chemin = cheminStorageDepuisUrl(sea.logo_url) ?? (sea.logo_nom ? `sea/${sea.logo_nom}` : null);
  if (!chemin) return;
  const { error } = await supabase.storage.from("feg").remove([chemin]);
  if (error) console.error("Erreur lors de la suppression du logo:", error);
}

/**
 * @swagger
 * /api/sea/{id}:
 *   get:
 *     summary: Récupère un SEA par son ID
 *     tags: [SEA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du SEA
 *       404:
 *         description: SEA non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest, context: Contexte) {
  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const sea = await prisma.sEA.findUnique({ where: { id_sea: id } });
    if (!sea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }
    return NextResponse.json(sea, { status: 200 });
  } catch (error) {
    console.error("Erreur GET /api/sea/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/sea/{id}:
 *   patch:
 *     summary: Met à jour partiellement un SEA (JSON)
 *     tags: [SEA]
 *     responses:
 *       200:
 *         description: SEA mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: SEA non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function PATCH(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }
    const body = await request.json();

    const existingSea = await prisma.sEA.findUnique({ where: { id_sea: id } });
    if (!existingSea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }

    // Seuls les champs connus sont acceptés.
    const data: Record<string, unknown> = {};
    for (const champ of CHAMPS_TEXTE) {
      if (typeof body[champ] === "string" || body[champ] === null) data[champ] = body[champ];
    }
    if (Array.isArray(body.services)) data.services = body.services.map(String);
    if (typeof body.partenaire_feg === "boolean") data.partenaire_feg = body.partenaire_feg;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Aucun champ valide à mettre à jour" }, { status: 400 });
    }

    const updatedSea = await prisma.sEA.update({ where: { id_sea: id }, data });
    return NextResponse.json(updatedSea, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/sea/{id}:
 *   delete:
 *     summary: Supprime un SEA et son logo
 *     tags: [SEA]
 *     responses:
 *       200:
 *         description: SEA supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: SEA non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function DELETE(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const existingSea = await prisma.sEA.findUnique({ where: { id_sea: id } });
    if (!existingSea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }

    const deletedSea = await prisma.sEA.delete({ where: { id_sea: id } });
    await supprimerLogo(existingSea);

    return NextResponse.json(deletedSea, { status: 200 });
  } catch (error) {
    console.error("Erreur DELETE :", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/sea/{id}:
 *   put:
 *     summary: Met à jour un SEA (multipart/form-data, logo facultatif)
 *     tags: [SEA]
 *     responses:
 *       200:
 *         description: SEA mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: SEA non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Le contenu doit être de type multipart/form-data" },
        { status: 400 }
      );
    }

    const existingSea = await prisma.sEA.findUnique({ where: { id_sea: id } });
    if (!existingSea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }

    const formData = await request.formData();
    const updates: any = {};

    for (const field of CHAMPS_TEXTE) {
      const value = formData.get(field);
      if (value !== null) updates[field] = value as string;
    }

    const servicesStr = formData.get("services");
    if (typeof servicesStr === "string" && servicesStr.trim()) {
      try {
        const parse = JSON.parse(servicesStr);
        if (Array.isArray(parse)) updates.services = parse.map(String);
      } catch {
        return NextResponse.json({ error: "Le champ services doit être un tableau JSON" }, { status: 400 });
      }
    }

    const partenaire_feg = formData.get("partenaire_feg");
    if (partenaire_feg !== null) updates.partenaire_feg = partenaire_feg === "true";

    // Le formulaire envoie le logo sous `logo` (modification) ou `image` (création).
    const logo = formData.get("logo") ?? formData.get("image");
    if (fichierFourni(logo)) {
      // Vérification AVANT de supprimer l'ancien logo.
      if (!logo.type.match(/^image\/(jpeg|png)$/)) {
        return NextResponse.json(
          { error: "Le logo doit être au format JPEG ou PNG" },
          { status: 400 }
        );
      }

      const fileName = nomFichierSur(logo.name);
      const filePath = `sea/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("feg")
        .upload(filePath, logo, { cacheControl: "3600", upsert: false, contentType: logo.type });

      if (uploadError) {
        console.error("Erreur lors de l'upload du logo:", uploadError);
        return NextResponse.json({ error: "Erreur lors de l'upload du logo" }, { status: 500 });
      }

      updates.logo_url = supabase.storage.from("feg").getPublicUrl(filePath).data.publicUrl;
      updates.logo_nom = fileName;
      updates.taille_logo = logo.size;
      updates.logo_mime_type = logo.type;

      await supprimerLogo(existingSea);
    }

    const updatedSea = await prisma.sEA.update({ where: { id_sea: id }, data: updates });
    return NextResponse.json(updatedSea);
  } catch (error) {
    console.error("Erreur PUT :", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
