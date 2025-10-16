import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// 📍 GET : Récupère une actualité via l’ID (extrait du slug)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // ✅ Si l’URL contient un slug (ex: "loi-commerce-1234"), on garde seulement la partie ID
  const cleanId = id.split("-").pop();

  try {
    const actualite = await prisma.actualite.findUnique({ where: { id: cleanId } });

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
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const cleanId = id.split("-").pop();

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Le contenu doit être de type multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    const updates: any = {};
    ["titre", "contenu", "categorie", "source", "lienSource"].forEach((field) => {
      const value = formData.get(field);
      if (value) updates[field] = value.toString();
    });

    if (file) {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = `actualite/${fileName}`;

      const { error } = await supabase.storage
        .from("feg")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (error) {
        console.error("Erreur upload:", error);
        return NextResponse.json({ error: "Erreur upload Supabase" }, { status: 500 });
      }

      const { data: urlData } = supabase.storage
        .from("feg")
        .getPublicUrl(filePath);

      updates.imageUrl = urlData.publicUrl;
    }

    const updated = await prisma.actualite.update({
      where: { id: cleanId },
      data: updates,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Erreur PUT /actualite/[id]:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

// 📍 DELETE : Supprime une actualité
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const cleanId = id.split("-").pop();

  try {
    await prisma.actualite.delete({ where: { id: cleanId } });
    return NextResponse.json({ message: "Actualité supprimée" });
  } catch (error) {
    console.error("❌ Erreur DELETE /actualite/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur ou ID non trouvé" }, { status: 500 });
  }
}
