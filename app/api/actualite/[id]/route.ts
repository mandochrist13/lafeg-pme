import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import {
  cheminStorageDepuisUrl,
  extraireUuid,
  fichierFourni,
  nomFichierSur,
} from "@/lib/api-utils";

type Contexte = { params: Promise<{ id: string }> };

// L'identifiant peut être l'UUID brut ou un slug « mon-titre-<uuid> ».
// (L'ancien `id.split("-").pop()` ne gardait que le dernier bloc de l'UUID,
// ce qui rendait toute lecture / modification impossible.)
async function lireId(context: Contexte): Promise<string | null> {
  const { id } = await context.params;
  return extraireUuid(id);
}

async function supprimerImage(imageUrl: string | null) {
  const chemin = cheminStorageDepuisUrl(imageUrl);
  if (!chemin) return;
  const { error } = await supabase.storage.from("feg").remove([chemin]);
  if (error) console.error("Erreur suppression ancienne image :", error);
}

// 📍 GET : Récupère une actualité via son ID
export async function GET(request: NextRequest, context: Contexte) {
  const id = await lireId(context);
  if (!id) {
    return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });
  }

  try {
    const actualite = await prisma.actualite.findUnique({ where: { id } });

    if (!actualite) {
      return NextResponse.json({ error: "Actualité non trouvée" }, { status: 404 });
    }

    return NextResponse.json(actualite);
  } catch (error) {
    console.error("❌ Erreur GET /actualite/[id]:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

// 📍 PUT : Mise à jour
export async function PUT(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  const id = await lireId(context);
  if (!id) {
    return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });
  }

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Le contenu doit être de type multipart/form-data" },
        { status: 400 }
      );
    }

    const existante = await prisma.actualite.findUnique({ where: { id } });
    if (!existante) {
      return NextResponse.json({ error: "Actualité non trouvée" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("image");

    const updates: Record<string, string | null> = {};
    for (const field of ["titre", "contenu"] as const) {
      const value = formData.get(field);
      if (typeof value === "string" && value.trim()) updates[field] = value.trim();
    }
    // Champs facultatifs : une chaîne vide efface la valeur.
    for (const field of ["categorie", "source", "lienSource"] as const) {
      const value = formData.get(field);
      if (typeof value === "string") updates[field] = value.trim() || null;
    }

    if (fichierFourni(file)) {
      if (!/^image\//.test(file.type)) {
        return NextResponse.json({ error: "Le fichier doit être une image" }, { status: 400 });
      }
      const filePath = `actualite/${nomFichierSur(file.name)}`;

      const { error } = await supabase.storage
        .from("feg")
        .upload(filePath, file, { cacheControl: "3600", upsert: false, contentType: file.type });

      if (error) {
        console.error("Erreur upload:", error);
        return NextResponse.json({ error: "Erreur upload Supabase" }, { status: 500 });
      }

      updates.imageUrl = supabase.storage.from("feg").getPublicUrl(filePath).data.publicUrl;
      await supprimerImage(existante.imageUrl);
    }

    const updated = await prisma.actualite.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Erreur PUT /actualite/[id]:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

// 📍 DELETE : Supprime une actualité
export async function DELETE(request: NextRequest, context: Contexte) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  const id = await lireId(context);
  if (!id) {
    return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });
  }

  try {
    const deleted = await prisma.actualite.delete({ where: { id } });
    await supprimerImage(deleted.imageUrl);
    return NextResponse.json({ message: "Actualité supprimée", data: deleted });
  } catch (error: any) {
    console.error("❌ Erreur DELETE /actualite/[id]:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Actualité introuvable ou déjà supprimée" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
