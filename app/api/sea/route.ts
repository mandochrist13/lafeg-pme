import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { fichierFourni, lirePagination, lireTri, nomFichierSur } from "@/lib/api-utils";

const CHAMPS_TRI = ["createdAt", "updatedAt", "nom", "categorie", "type_sea"] as const;

/** `services` arrive en JSON (chaîne) depuis le formulaire ; on tolère aussi une liste séparée par des virgules. */
function lireServices(valeur: FormDataEntryValue | null): string[] {
  if (typeof valeur !== "string" || !valeur.trim()) return [];
  try {
    const parse = JSON.parse(valeur);
    if (Array.isArray(parse)) return parse.map(String).map((s) => s.trim()).filter(Boolean);
  } catch {
    // pas du JSON : liste séparée par des virgules
  }
  return valeur.split(",").map((s) => s.trim()).filter(Boolean);
}

/**
 * @swagger
 * /api/sea:
 *   get:
 *     summary: Récupère une liste paginée des SEA
 *     tags:
 *       - SEA
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
 *           enum: [createdAt, updatedAt, nom, categorie, type_sea]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: type
 *         description: Filtre sur `type_sea`
 *         schema:
 *           type: string
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des SEA récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { page, limit, skip } = lirePagination(searchParams, { limitDefaut: 100, limitMax: 1000 });
    const { champ, ordre } = lireTri(searchParams, CHAMPS_TRI, "createdAt");

    const where: any = {};
    const type = searchParams.get("type");
    if (type) where.type_sea = type;
    const categorie = searchParams.get("categorie");
    if (categorie) where.categorie = categorie;

    const [data, total] = await Promise.all([
      prisma.sEA.findMany({ where, skip, take: limit, orderBy: { [champ]: ordre } }),
      prisma.sEA.count({ where }),
    ]);

    return NextResponse.json(
      { data, pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données SEA:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données SEA" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/sea:
 *   post:
 *     summary: Crée un nouveau SEA
 *     description: Ajoute une structure d'accompagnement (multipart/form-data, logo facultatif en JPEG/PNG). Authentification administrateur requise.
 *     tags: [SEA]
 *     responses:
 *       201:
 *         description: SEA créé avec succès
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
    const type_sea = ((formData.get("type_sea") as string | null) ?? "").trim();
    const categorie = ((formData.get("categorie") as string | null) ?? "").trim();
    const description = (formData.get("description") as string | null) || "";
    const services = lireServices(formData.get("services"));
    const adresse = (formData.get("adresse") as string | null) || "";
    const contact = (formData.get("contact") as string | null) || null;
    const mail = (formData.get("mail") as string | null) || null;
    const site_web = (formData.get("site_web") as string | null) || null;
    const rs_1 = (formData.get("rs_1") as string | null) || null;
    const rs_2 = (formData.get("rs_2") as string | null) || null;
    const partenaire_feg = formData.get("partenaire_feg") === "true";

    if (!nom || !type_sea || !categorie) {
      return NextResponse.json(
        { error: "Les champs nom, type_sea et categorie sont requis." },
        { status: 400 }
      );
    }

    let logo_url: string | null = null;
    let logo_nom: string | null = null;
    let taille_logo: number | null = null;
    let logo_mime_type: string | undefined;

    // Le formulaire envoie le logo sous `image` (création) ou `logo` (modification).
    const logo = formData.get("image") ?? formData.get("logo");
    if (fichierFourni(logo)) {
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

      logo_url = supabase.storage.from("feg").getPublicUrl(filePath).data.publicUrl;
      // On mémorise le nom réellement stocké (avec horodatage) pour pouvoir le supprimer plus tard.
      logo_nom = fileName;
      taille_logo = logo.size;
      logo_mime_type = logo.type;
    }

    const newSea = await prisma.sEA.create({
      data: {
        nom,
        description,
        type_sea,
        categorie,
        services,
        adresse,
        contact,
        mail,
        site_web,
        rs_1,
        rs_2,
        logo_url,
        logo_nom,
        taille_logo,
        ...(logo_mime_type ? { logo_mime_type } : {}),
        partenaire_feg,
      },
    });

    return NextResponse.json(newSea, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création:", error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
