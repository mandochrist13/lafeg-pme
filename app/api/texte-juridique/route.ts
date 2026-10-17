import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { fichierFourni, lireDate, lirePagination, nomFichierSur } from "@/lib/api-utils";

/**
 * @swagger
 * /api/texte-juridique:
 *   get:
 *     tags:
 *       - Textes Juridiques
 *     summary: Récupérer la liste des textes juridiques
 *     description: |
 *       Liste paginée, triée par date de parution décroissante. Filtres :
 *       `categorie`, `type_texte` (une valeur ou plusieurs séparées par des virgules),
 *       `titre` ou `search` (recherche insensible à la casse dans le titre et la description).
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *           enum: [pmes, internationaux, administrations]
 *       - in: query
 *         name: type_texte
 *         schema:
 *           type: string
 *       - in: query
 *         name: titre
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 1000
 *           default: 10
 *     responses:
 *       200:
 *         description: Liste des textes juridiques récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorie = searchParams.get("categorie");
    const type = searchParams.get("type_texte");
    const recherche = (searchParams.get("titre") ?? searchParams.get("search") ?? "").trim();
    const { page, limit, skip } = lirePagination(searchParams, { limitDefaut: 10, limitMax: 1000 });

    const where: any = {};
    if (categorie && categorie !== "all") where.categorie = categorie;
    if (type && type !== "all") {
      const types = type.split(",").map((t) => t.trim()).filter(Boolean);
      where.type_texte = types.length > 1 ? { in: types } : types[0];
    }
    if (recherche) {
      where.OR = [
        { titre: { contains: recherche, mode: "insensitive" } },
        { description: { contains: recherche, mode: "insensitive" } },
      ];
    }

    const [textes, total] = await Promise.all([
      prisma.texteJuridique.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date_parution: "desc" },
      }),
      prisma.texteJuridique.count({ where }),
    ]);

    return NextResponse.json({
      data: textes,
      pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des textes juridiques:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des textes juridiques" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/texte-juridique:
 *   post:
 *     tags:
 *       - Textes Juridiques
 *     summary: Créer un nouveau texte juridique avec fichier PDF
 *     description: multipart/form-data avec `titre`, `type_texte`, `categorie`, `date_parution`, `fichier` (PDF). Authentification administrateur requise.
 *     responses:
 *       201:
 *         description: Texte juridique créé avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
export async function POST(request: NextRequest) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Le contenu doit être de type multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("fichier");

    if (!fichierFourni(file)) {
      return NextResponse.json({ error: "Fichier PDF requis" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Seuls les fichiers PDF sont acceptés" }, { status: 400 });
    }

    const titre = ((formData.get("titre") as string | null) ?? "").trim();
    const type_texte = ((formData.get("type_texte") as string | null) ?? "").trim();
    const categorie = ((formData.get("categorie") as string | null) ?? "").trim();
    const description = (formData.get("description") as string | null) || null;
    const date_parution = lireDate(formData.get("date_parution"));
    const version = (formData.get("version") as string | null) || null;

    if (!titre || !type_texte || !categorie || type_texte === "all" || categorie === "all") {
      return NextResponse.json(
        { error: "Les champs titre, type_texte et categorie sont requis." },
        { status: 400 }
      );
    }
    if (!date_parution) {
      return NextResponse.json({ error: "Date de parution invalide ou manquante." }, { status: 400 });
    }

    const fileName = nomFichierSur(file.name);
    const filePath = `texte-juridique/${fileName}`;

    const { error } = await supabase.storage
      .from("feg")
      .upload(filePath, file, { cacheControl: "3600", upsert: false, contentType: file.type });

    if (error) {
      console.error("Erreur de l'upload:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from("feg").getPublicUrl(filePath);

    const texteJuridique = await prisma.texteJuridique.create({
      data: {
        titre,
        type_texte,
        fichier_url: urlData.publicUrl,
        fichier_nom: fileName,
        taille_fichier: file.size,
        mime_type: file.type,
        categorie,
        description,
        date_parution,
        version,
      },
    });

    return NextResponse.json(texteJuridique, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du texte juridique:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du texte juridique" },
      { status: 500 }
    );
  }
}
