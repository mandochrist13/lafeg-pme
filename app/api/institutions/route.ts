import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { fichierFourni, lirePagination, lireTri, nomFichierSur } from "@/lib/api-utils";

const CHAMPS_TRI = ["createdAt", "updatedAt", "nom", "categorie", "type_institution"] as const;

/**
 * @swagger
 * /api/institutions:
 *   get:
 *     summary: Récupère une liste paginée des institutions
 *     tags:
 *       - Institutions
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *           maximum: 1000
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, nom, categorie, type_institution]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: nom
 *         description: Recherche partielle sur le nom
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         description: Filtre sur `type_institution`
 *         schema:
 *           type: string
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des institutions récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { page, limit, skip } = lirePagination(searchParams, { limitDefaut: 100, limitMax: 1000 });
    const { champ, ordre } = lireTri(searchParams, CHAMPS_TRI, "createdAt");

    const where: any = {};

    const nom = searchParams.get("nom");
    if (nom) where.nom = { contains: nom, mode: "insensitive" };

    const type = searchParams.get("type");
    if (type) where.type_institution = type;

    const categorie = searchParams.get("categorie");
    if (categorie) where.categorie = categorie;

    const [institutions, total] = await Promise.all([
      prisma.institutions.findMany({ where, skip, take: limit, orderBy: { [champ]: ordre } }),
      prisma.institutions.count({ where }),
    ]);

    return NextResponse.json(
      {
        message: "Liste des institutions récupérée avec succès",
        content: institutions,
        pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des institutions:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des institutions" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/institutions:
 *   post:
 *     summary: Crée une nouvelle institution
 *     description: Ajoute une institution financière (multipart/form-data, logo facultatif en JPEG/PNG). Authentification administrateur requise.
 *     tags: [Institutions]
 *     responses:
 *       201:
 *         description: Institution créée avec succès
 *       400:
 *         description: Données invalides
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

    const nom = ((formData.get("nom") as string | null) ?? "").trim();
    const categorie = ((formData.get("categorie") as string | null) ?? "").trim();
    const type_institution = ((formData.get("type_institution") as string | null) ?? "").trim();
    const partenaire_feg = formData.get("partenaire_feg") === "true";
    const description = (formData.get("description") as string | null) || null;
    const adresse = (formData.get("adresse") as string | null) || null;
    const contact = (formData.get("contact") as string | null) || null;
    const mail = (formData.get("mail") as string | null) || null;
    const site_web = (formData.get("site_web") as string | null) || null;
    const rs_1 = (formData.get("rs_1") as string | null) || null;
    const rs_2 = (formData.get("rs_2") as string | null) || null;
    const service = (formData.get("service") as string | null) || null;

    if (!nom || !categorie || !type_institution) {
      return NextResponse.json(
        { error: "Les champs nom, categorie et type_institution sont requis." },
        { status: 400 }
      );
    }

    let image_url: string | null = null;
    let image_nom: string | null = null;
    let taille_image: number | null = null;
    let image_mime_type: string | undefined;

    const file = formData.get("image");
    if (fichierFourni(file)) {
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        return NextResponse.json(
          { error: "Le logo doit être au format JPEG ou PNG" },
          { status: 400 }
        );
      }

      const fileName = nomFichierSur(file.name);
      const filePath = `institution-financiere/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("feg")
        .upload(filePath, file, { cacheControl: "3600", upsert: false, contentType: file.type });

      if (uploadError) {
        console.error("Erreur lors de l'upload du logo:", uploadError);
        return NextResponse.json({ error: "Erreur lors de l'upload du logo" }, { status: 500 });
      }

      image_url = supabase.storage.from("feg").getPublicUrl(filePath).data.publicUrl;
      // Nom réellement stocké (avec horodatage) pour pouvoir le supprimer plus tard.
      image_nom = fileName;
      taille_image = file.size;
      image_mime_type = file.type;
    }

    const newInstitution = await prisma.institutions.create({
      data: {
        nom,
        categorie,
        type_institution,
        partenaire_feg,
        description,
        image_url,
        image_nom,
        taille_image,
        ...(image_mime_type ? { image_mime_type } : {}),
        adresse,
        contact,
        mail,
        site_web,
        rs_1,
        rs_2,
        service,
      },
    });

    return NextResponse.json(
      { message: "Institution créée avec succès", institution: newInstitution },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'institution:", error);
    return NextResponse.json({ error: "Erreur Interne du Serveur" }, { status: 500 });
  }
}
