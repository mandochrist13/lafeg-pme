import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
// import slugify from "slugify";

export const config = {
  api: { bodyParser: false },
};

// 📍 GET : Liste paginée
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const categorie = searchParams.get("categorie");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (categorie) where.categorie = categorie;

    const [actualites, total] = await Promise.all([
      prisma.actualite.findMany({
        where,
        skip,
        take: limit,
        orderBy: { datePub: "desc" },
      }),
      prisma.actualite.count({ where }),
    ]);

    // ✅ On ajoute un slug dynamique côté API, sans l’enregistrer
    // const actualitesAvecSlug = actualites.map((a) => ({
    //   ...a,
    //   slug: `${slugify(a.titre, { lower: true, strict: true })}-${a.id}`,
    // }));

    return NextResponse.json({
    //   data: actualitesAvecSlug,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
    const titre = formData.get("titre") as string;
    const contenu = formData.get("contenu") as string;
    const categorie = formData.get("categorie") as string | null;
    const source = formData.get("source") as string | null;
    const lienSource = formData.get("lienSource") as string | null;

    if (!titre || !contenu) {
      return NextResponse.json(
        { error: "Titre et contenu sont requis" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    if (file) {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = `actualite/${fileName}`;

      const { error } = await supabase.storage
        .from("feg")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (error) {
        console.error("Erreur upload:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const { data: urlData } = supabase.storage
        .from("feg")
        .getPublicUrl(filePath);

      imageUrl = urlData.publicUrl;
    }

    // ✅ Création simple, pas de slug enregistré
    const actualite = await prisma.actualite.create({
      data: { titre, contenu, categorie, source, lienSource, imageUrl },
    });

    // ✅ Retourne un slug dynamique pour le front
    // const slug = `${slugify(titre, { lower: true, strict: true })}-${actualite.id}`;

    return NextResponse.json({ ...actualite, 
        // slug 
    }, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur POST /actualite:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'actualité." },
      { status: 500 }
    );
  }
}
