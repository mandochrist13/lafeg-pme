import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { fichierFourni, lirePagination, nomFichierSur } from "@/lib/api-utils";

// 📍 GET : Liste paginée
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { page, limit, skip } = lirePagination(searchParams, { limitDefaut: 10, limitMax: 1000 });
    const categorie = searchParams.get("categorie");

    const where: any = {};
    if (categorie && categorie !== "all") where.categorie = categorie;

    const [actualites, total] = await Promise.all([
      prisma.actualite.findMany({
        where,
        skip,
        take: limit,
        orderBy: { datePub: "desc" },
      }),
      prisma.actualite.count({ where }),
    ]);

    return NextResponse.json({
      data: actualites,
      pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (error) {
    console.error("❌ Erreur GET /actualite:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des actualités." },
      { status: 500 }
    );
  }
}

// 📍 POST : Créer une actualité (avec upload image Supabase)
export async function POST(request: NextRequest) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Le contenu doit être de type multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image");
    const titre = (formData.get("titre") as string | null)?.trim();
    const contenu = (formData.get("contenu") as string | null)?.trim();
    const categorie = (formData.get("categorie") as string | null) || null;
    const source = (formData.get("source") as string | null) || null;
    const lienSource = (formData.get("lienSource") as string | null) || null;

    if (!titre || !contenu) {
      return NextResponse.json(
        { error: "Titre et contenu sont requis" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

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
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      imageUrl = supabase.storage.from("feg").getPublicUrl(filePath).data.publicUrl;
    }

    const actualite = await prisma.actualite.create({
      data: { titre, contenu, categorie, source, lienSource, imageUrl },
    });

    return NextResponse.json(actualite, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur POST /actualite:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'actualité." },
      { status: 500 }
    );
  }
}
