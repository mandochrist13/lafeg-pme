import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/publicites/{id}:
 *   get:
 *     summary: Récupérer une publicité par ID
 *     description: Retourne les détails d'une publicité spécifique
 *     tags: [Publicités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicité
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicité trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publicite'
 *       404:
 *         description: Publicité non trouvée
 *       500:
 *         description: Erreur serveur
 */

// GET - Récupérer une publicité par son ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Vérification de l'ID
  if (!params.id) {
    return NextResponse.json(
      { error: "ID de la publicité manquant" },
      { status: 400 },
    );
  }
  // Vérification du format de l'ID
  if (!/^[a-zA-Z0-9-]+$/.test(params.id)) {
    return NextResponse.json(
      { error: "ID de la publicité invalide" },
      { status: 400 },
    );
  }
  // Vérification de la longueur de l'ID
  if (params.id.length > 36) {
    return NextResponse.json(
      { error: "ID de la publicité trop long" },
      { status: 400 },
    );
  }
  try {
    const { id } = params;

    const vente = await prisma.vente.findUnique({
      where: { id_vente: id },
    });

    if (!vente) {
      return NextResponse.json(
        { error: "Publicité non trouvée" },
        { status: 404 },
      );
    }

    return NextResponse.json(vente);
  } catch (error) {
    console.error("Erreur lors de la récupération de la publicité:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la publicité" },
      { status: 500 },
    );
  }
}

/**
 * @swagger
 * /api/publicites/{id}:
 *   put:
 *     summary: Mettre à jour une publicité
 *     description: Met à jour une publicité existante avec possibilité de changer l'image
 *     tags: [Publicités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicité à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Nouveau libellé de la publicité
 *               nom_structure:
 *                 type: string
 *                 description: Nouveau nom de structure
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Nouvelle image (optionnel)
 *     responses:
 *       200:
 *         description: Publicité mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publicite'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Publicité non trouvée
 *       500:
 *         description: Erreur serveur
 */

// PUT - Mettre à jour une publicité
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);

    if (!id) {
      return NextResponse.json({ erreur: "ID manquant" }, { status: 400 });
    }


    // Vérifier que la requête est bien de type multipart/form-data
    const ContentType = request.headers.get("content-type");

    if (!ContentType || !ContentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { erreur: "Le contenu doit être de type multipart/form-data" },
        { status: 400 },
      );
    }

    // Traitement du formulaire
    const formData = await request.formData();

    // Récupérer les données du formulaire
    const libelle = formData.get("libelle") as string;
    const nom_structure = formData.get("nom_structure") as string;
    const file = formData.get("image") as File;
    const lienRaw = formData.get("lien");
    const lien =
      typeof lienRaw === "string" && lienRaw.trim() !== ""
        ? lienRaw.trim()
        : null;

    // Validation basique
    if (!libelle || !nom_structure) {
      return NextResponse.json(
        { erreur: "Le libellé et le nom de la structure sont obligatoires" },
        { status: 400 },
      );
    }

    // Vérifier si la publicité existe
    const existingVente = await prisma.vente.findUnique({
      where: { id_vente: id },
    });

    if (!existingVente) {
      return NextResponse.json(
        { erreur: "Publicité non trouvée" },
        { status: 404 },
      );
    }

    // Préparer les données à mettre à jour

    const updateData: any = {
      libelle,
      nom_structure,
      lien,
    };

    // Traiter l'upload de l'image si une nouvelle est fournie
    if (file && file.size > 0) {
      // Vérification du type de fichier
      if (file.type !== "image/png") {
        return NextResponse.json(
          { erreur: "Seuls les fichiers PNG sont acceptés" },
          { status: 400 },
        );
      }

      // Extraire le nom du fichier de l'URL existante
      const existingFileName = existingVente.image_url.split("/").pop();

      // Supprimer l'ancienne image si elle existe
      if (existingFileName) {
        const { error: deleteError } = await supabase.storage
          .from("feg")
          .remove([`annonces/${existingFileName}`]);

        if (deleteError) {
          console.warn(
            "Erreur lors de la suppression de l'ancienne image:",
            deleteError,
          );
        }
      }

      // Création d'un nom de fichier unique
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const FileName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
      const FilePath = `annonces/${FileName}`;

      // Upload du fichier vers Supabase Storage
      const { data, error } = await supabase.storage
        .from("feg")
        .upload(FilePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      // Vérification de l'upload
      if (error) {
        console.error(`Erreur de l'upload:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const { data: urlData } = supabase.storage
        .from("feg")
        .getPublicUrl(FilePath);

      // Ajouter les informations de l'image aux données à mettre à jour
      Object.assign(updateData, {
        image_url: urlData.publicUrl,
        image_nom: file.name,
        taille_image: file.size,
        mime_type: file.type,
      });
    }

    // Mettre à jour la publicité
    const updatedVente = await prisma.vente.update({
      where: { id_vente: id },
      data: updateData,
    });

    return NextResponse.json(updatedVente);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la publicité:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la publicité" },
      { status: 500 },
    );
  }
}

/**
 * @swagger
 * /api/publicites/{id}:
 *   delete:
 *     summary: Supprimer une publicité
 *     description: Supprime une publicité existante
 *     tags: [Publicités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicité à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicité supprimée avec succès
 *       404:
 *         description: Publicité non trouvée
 *       500:
 *         description: Erreur serveur
 */

// DELETE - Supprimer une publicité
export async function DELETE(
  request: NextRequest,
  // 👇 Accepte Promise ou objet direct pour garder la compatibilité
  { params }: { params: { id: string } } | { params: Promise<{ id: string }> },
) {
  try {
    // Normalisation : marche que ce soit une Promise ou non
    const { id } = await Promise.resolve(params);

    // Vérifier l’existence
    const vente = await prisma.vente.findUnique({ where: { id_vente: id } });
    if (!vente) {
      return NextResponse.json(
        { message: "Vente introuvable" },
        { status: 404 },
      );
    }

    await prisma.vente.delete({ where: { id_vente: id } });

    // 204 = succès sans corps de réponse
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/vente/[id] error:", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
