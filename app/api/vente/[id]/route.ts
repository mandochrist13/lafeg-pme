import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { cheminStorageDepuisUrl, estUuid, fichierFourni, nomFichierSur } from "@/lib/api-utils";

type Contexte = { params: Promise<{ id: string }> };
const TYPES_IMAGE = /^image\/(jpeg|png|gif)$/i;

/** Supprime une image du bucket à partir de son URL publique (sans faire échouer la requête). */
async function supprimerImage(imageUrl: string | null | undefined) {
  const chemin = cheminStorageDepuisUrl(imageUrl);
  if (!chemin) return;
  const { error } = await supabase.storage.from("feg").remove([chemin]);
  if (error) console.warn("Erreur lors de la suppression de l'ancienne image:", error);
}

/**
 * @swagger
 * /api/vente/{id}:
 *   get:
 *     summary: Récupérer une publicité par ID
 *     tags: [Publicités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicité trouvée
 *       404:
 *         description: Publicité non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest, context: Contexte) {
  const { id } = await context.params;
  if (!estUuid(id)) {
    return NextResponse.json({ error: "ID de la publicité invalide" }, { status: 400 });
  }

  try {
    const vente = await prisma.vente.findUnique({ where: { id_vente: id } });
    if (!vente) {
      return NextResponse.json({ error: "Publicité non trouvée" }, { status: 404 });
    }
    return NextResponse.json(vente);
  } catch (error) {
    console.error("Erreur lors de la récupération de la publicité:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la publicité" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/vente/{id}:
 *   put:
 *     summary: Mettre à jour une publicité (JSON ou multipart/form-data)
 *     tags: [Publicités]
 *     responses:
 *       200:
 *         description: Publicité mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Publicité non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID de la publicité invalide" }, { status: 400 });
    }

    const existing = await prisma.vente.findUnique({ where: { id_vente: id } });
    if (!existing) {
      return NextResponse.json({ error: "Publicité non trouvée" }, { status: 404 });
    }

    const ContentType = request.headers.get("content-type") || "";

    // Chemin principal : métadonnées JSON (image déjà téléversée vers Supabase côté navigateur)
    if (ContentType.includes("application/json")) {
      const body = await request.json();
      const { libelle, nom_structure, lien } = body;

      if (!libelle || !nom_structure) {
        return NextResponse.json(
          { error: "Le libellé et le nom de la structure sont obligatoires" },
          { status: 400 }
        );
      }

      const data: any = {
        libelle,
        nom_structure,
        lien: typeof lien === "string" && lien.trim() !== "" ? lien.trim() : null,
      };

      // Champs image présents uniquement si une nouvelle image a été téléversée
      const nouvelleImage = typeof body.image_url === "string" && body.image_url && body.image_url !== existing.image_url;
      if (nouvelleImage) {
        data.image_url = body.image_url;
        data.image_nom = body.image_nom ?? existing.image_nom;
        data.taille_image = typeof body.taille_image === "number" ? body.taille_image : null;
        data.mime_type = body.mime_type ?? existing.mime_type;
      }

      const updated = await prisma.vente.update({ where: { id_vente: id }, data });

      // L'ancienne image n'est plus référencée : on la supprime du stockage
      // (sauf si une autre publicité l'utilise encore, cas de la duplication).
      if (nouvelleImage) {
        const encoreUtilisee = await prisma.vente.count({ where: { image_url: existing.image_url } });
        if (encoreUtilisee === 0) await supprimerImage(existing.image_url);
      }

      return NextResponse.json(updated);
    }

    // Ancien chemin : multipart/form-data
    if (!ContentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Le contenu doit être de type multipart/form-data ou application/json" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const libelle = ((formData.get("libelle") as string | null) ?? "").trim();
    const nom_structure = ((formData.get("nom_structure") as string | null) ?? "").trim();
    const file = formData.get("image");
    const lienRaw = formData.get("lien");
    const lien = typeof lienRaw === "string" && lienRaw.trim() !== "" ? lienRaw.trim() : null;

    if (!libelle || !nom_structure) {
      return NextResponse.json(
        { error: "Le libellé et le nom de la structure sont obligatoires" },
        { status: 400 }
      );
    }

    const updateData: any = { libelle, nom_structure, lien };

    if (fichierFourni(file)) {
      // Vérification AVANT de supprimer l'ancienne image.
      if (!TYPES_IMAGE.test(file.type)) {
        return NextResponse.json(
          { error: "L’image doit être au format JPEG, PNG ou GIF" },
          { status: 400 }
        );
      }

      const FileName = nomFichierSur(file.name);
      const FilePath = `annonces/${FileName}`;

      const { error } = await supabase.storage
        .from("feg")
        .upload(FilePath, file, { cacheControl: "3600", upsert: false, contentType: file.type });

      if (error) {
        console.error("Erreur de l'upload:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      Object.assign(updateData, {
        image_url: supabase.storage.from("feg").getPublicUrl(FilePath).data.publicUrl,
        image_nom: FileName,
        taille_image: file.size,
        mime_type: file.type,
      });
    }

    const updatedVente = await prisma.vente.update({ where: { id_vente: id }, data: updateData });

    if (updateData.image_url) {
      const encoreUtilisee = await prisma.vente.count({ where: { image_url: existing.image_url } });
      if (encoreUtilisee === 0) await supprimerImage(existing.image_url);
    }

    return NextResponse.json(updatedVente);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la publicité:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la publicité" },
      { status: 500 }
    );
  }
}

// PATCH - Mise à jour partielle d'une publicité (ex: activer/désactiver)
export async function PATCH(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID de la publicité invalide" }, { status: 400 });
    }

    const existing = await prisma.vente.findUnique({ where: { id_vente: id } });
    if (!existing) {
      return NextResponse.json({ error: "Publicité non trouvée" }, { status: 404 });
    }

    const body = await request.json();
    const data: any = {};

    if (typeof body.actif === "boolean") data.actif = body.actif;
    if (typeof body.libelle === "string") data.libelle = body.libelle;
    if (typeof body.nom_structure === "string") data.nom_structure = body.nom_structure;
    if ("lien" in body) {
      data.lien = typeof body.lien === "string" && body.lien.trim() !== "" ? body.lien.trim() : null;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Aucun champ valide à mettre à jour" }, { status: 400 });
    }

    const updated = await prisma.vente.update({ where: { id_vente: id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour partielle:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la publicité" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/vente/{id}:
 *   delete:
 *     summary: Supprimer une publicité (et son image si plus utilisée)
 *     tags: [Publicités]
 *     responses:
 *       204:
 *         description: Publicité supprimée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Publicité non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function DELETE(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID de la publicité invalide" }, { status: 400 });
    }

    const vente = await prisma.vente.findUnique({ where: { id_vente: id } });
    if (!vente) {
      return NextResponse.json({ message: "Vente introuvable" }, { status: 404 });
    }

    await prisma.vente.delete({ where: { id_vente: id } });

    // Les publicités dupliquées partagent la même image : on ne la supprime que si plus personne ne l'utilise.
    const encoreUtilisee = await prisma.vente.count({ where: { image_url: vente.image_url } });
    if (encoreUtilisee === 0) await supprimerImage(vente.image_url);

    // 204 = succès sans corps de réponse
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/vente/[id] error:", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
