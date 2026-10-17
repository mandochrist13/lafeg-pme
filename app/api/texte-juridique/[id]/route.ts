import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { estUuid, fichierFourni, lireDate, nomFichierSur } from "@/lib/api-utils";

type Contexte = { params: Promise<{ id: string }> };

async function supprimerFichier(nom: string | null | undefined) {
  if (!nom) return;
  const { error } = await supabase.storage.from("feg").remove([`texte-juridique/${nom}`]);
  if (error) console.error("Erreur lors de la suppression du fichier:", error);
}

/**
 * @swagger
 * /api/texte-juridique/{id}:
 *   get:
 *     summary: Récupérer un texte juridique par ID
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Texte juridique trouvé
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest, context: Contexte) {
  const { id } = await context.params;
  if (!estUuid(id)) {
    return NextResponse.json({ error: "ID du texte juridique invalide" }, { status: 400 });
  }

  try {
    const texteJuridique = await prisma.texteJuridique.findUnique({
      where: { id_texteJuridique: id },
    });

    if (!texteJuridique) {
      return NextResponse.json({ error: "Texte juridique non trouvé" }, { status: 404 });
    }

    return NextResponse.json(texteJuridique);
  } catch (error) {
    console.error("Erreur lors de la récupération du texte juridique:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du texte juridique" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/texte-juridique/{id}:
 *   put:
 *     summary: Mettre à jour un texte juridique (multipart/form-data, PDF facultatif)
 *     tags: [Textes Juridiques]
 *     responses:
 *       200:
 *         description: Texte juridique mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID du texte juridique invalide" }, { status: 400 });
    }

    const existingTexte = await prisma.texteJuridique.findUnique({
      where: { id_texteJuridique: id },
    });
    if (!existingTexte) {
      return NextResponse.json({ error: "Texte juridique non trouvé" }, { status: 404 });
    }

    const formData = await request.formData();
    const updates: any = {};

    for (const field of ["titre", "type_texte", "categorie", "description", "version"]) {
      const value = formData.get(field);
      if (typeof value === "string") {
        if (field === "titre" || field === "type_texte" || field === "categorie") {
          if (value.trim() && value !== "all") updates[field] = value.trim();
        } else {
          updates[field] = value.trim() || null;
        }
      }
    }

    const dateStr = formData.get("date_parution");
    if (typeof dateStr === "string" && dateStr.trim()) {
      const d = lireDate(dateStr);
      if (!d) {
        return NextResponse.json({ error: "Date de parution invalide" }, { status: 400 });
      }
      updates.date_parution = d;
    }

    const file = formData.get("fichier");
    if (fichierFourni(file)) {
      // Vérification AVANT de supprimer l'ancien fichier.
      if (file.type !== "application/pdf") {
        return NextResponse.json({ error: "Seuls les fichiers PDF sont acceptés" }, { status: 400 });
      }

      const fileName = nomFichierSur(file.name);
      const filePath = `texte-juridique/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("feg")
        .upload(filePath, file, { cacheControl: "3600", upsert: false, contentType: file.type });

      if (uploadError) {
        console.error("Erreur lors de l'upload:", uploadError);
        return NextResponse.json({ error: "Erreur lors de l'upload du fichier" }, { status: 500 });
      }

      updates.fichier_url = supabase.storage.from("feg").getPublicUrl(filePath).data.publicUrl;
      updates.fichier_nom = fileName;
      updates.taille_fichier = file.size;
      updates.mime_type = file.type;

      await supprimerFichier(existingTexte.fichier_nom);
    }

    const updatedTexte = await prisma.texteJuridique.update({
      where: { id_texteJuridique: id },
      data: updates,
    });

    return NextResponse.json(updatedTexte);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du texte juridique:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du texte juridique" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/texte-juridique/{id}:
 *   delete:
 *     summary: Supprimer un texte juridique et son fichier PDF
 *     tags: [Textes Juridiques]
 *     responses:
 *       200:
 *         description: Texte juridique supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function DELETE(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { id } = await context.params;
    if (!estUuid(id)) {
      return NextResponse.json({ error: "ID du texte juridique invalide" }, { status: 400 });
    }

    const texte = await prisma.texteJuridique.findUnique({ where: { id_texteJuridique: id } });
    if (!texte) {
      return NextResponse.json({ error: "Texte juridique non trouvé" }, { status: 404 });
    }

    await prisma.texteJuridique.delete({ where: { id_texteJuridique: id } });
    await supprimerFichier(texte.fichier_nom);

    return NextResponse.json({ message: "Texte juridique supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du texte juridique:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du texte juridique" },
      { status: 500 }
    );
  }
}
