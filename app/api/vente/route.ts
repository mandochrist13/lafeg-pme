import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { fichierFourni, lirePagination, lireTri, nomFichierSur } from "@/lib/api-utils";

const CHAMPS_TRI = ["createdAt", "updatedAt", "libelle", "nom_structure", "actif"] as const;
const TYPES_IMAGE = /^image\/(jpeg|png|gif)$/i;

/**
 * @swagger
 * /api/vente:
 *   get:
 *     summary: Récupère une liste paginée des publicités
 *     tags:
 *       - Publicités
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
 *           default: 10
 *           maximum: 1000
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, libelle, nom_structure, actif]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: libelle
 *         description: Emplacement exact (HEADER, HERO, MIDDLE, ACTU, INSTITUTION, SEA)
 *         schema:
 *           type: string
 *       - in: query
 *         name: actif
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *       - in: query
 *         name: keyword
 *         description: Recherche dans le libellé et le nom de la structure
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des publicités récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { page, limit, skip } = lirePagination(searchParams, { limitDefaut: 10, limitMax: 1000 });
    const { champ, ordre } = lireTri(searchParams, CHAMPS_TRI, "createdAt");

    const where: any = {};

    const libelle = searchParams.get("libelle");
    if (libelle) where.libelle = libelle;

    const actif = searchParams.get("actif") ?? searchParams.get("status");
    if (actif === "true" || actif === "false") where.actif = actif === "true";

    const keyword = searchParams.get("keyword");
    if (keyword) {
      where.OR = [
        { libelle: { contains: keyword, mode: "insensitive" } },
        { nom_structure: { contains: keyword, mode: "insensitive" } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.vente.findMany({ where, skip, take: limit, orderBy: { [champ]: ordre } }),
      prisma.vente.count({ where }),
    ]);

    return NextResponse.json(
      { data, pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des publicités:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des publicités" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/vente:
 *   post:
 *     summary: Crée une nouvelle publicité
 *     description: |
 *       Deux formats acceptés : `application/json` (image déjà téléversée côté navigateur,
 *       champs `libelle`, `image_url`, `nom_structure`, `lien`, `image_nom`, `taille_image`, `mime_type`, `actif`)
 *       ou `multipart/form-data` (champ `image` JPEG/PNG/GIF). Authentification administrateur requise.
 *     tags: [Publicités]
 *     responses:
 *       201:
 *         description: Publicité créée avec succès
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
    const ContentType = request.headers.get("content-type") || "";

    // Chemin principal : l'image a déjà été téléversée vers Supabase côté navigateur,
    // on ne reçoit que des métadonnées JSON (payload léger, compatible Vercel).
    if (ContentType.includes("application/json")) {
      const body = await request.json();
      const { libelle, nom_structure, lien, image_url, image_nom, taille_image, mime_type, actif } = body;

      if (!image_url || !libelle) {
        return NextResponse.json(
          { error: "Champs requis manquants (libelle et image_url)" },
          { status: 400 }
        );
      }

      const annonce = await prisma.vente.create({
        data: {
          libelle,
          image_url,
          image_nom: image_nom ?? "",
          taille_image: typeof taille_image === "number" ? taille_image : null,
          mime_type: mime_type ?? "image/png",
          nom_structure: nom_structure ?? "",
          actif: typeof actif === "boolean" ? actif : true,
          lien: typeof lien === "string" && lien.trim() !== "" ? lien.trim() : null,
        },
      });

      return NextResponse.json(annonce, { status: 201 });
    }

    // Ancien chemin : multipart/form-data (upload du fichier via la route API)
    if (!ContentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Le contenu doit être de type multipart/form-data ou application/json" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image");

    if (!fichierFourni(file)) {
      return NextResponse.json({ error: "Fichier requis" }, { status: 400 });
    }

    if (!TYPES_IMAGE.test(file.type)) {
      return NextResponse.json(
        { error: "L’image doit être au format JPEG, PNG ou GIF" },
        { status: 400 }
      );
    }

    const libelle = ((formData.get("libelle") as string | null) ?? "").trim();
    if (!libelle) {
      return NextResponse.json({ error: "Le libellé (emplacement) est requis" }, { status: 400 });
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

    const { data: urlData } = supabase.storage.from("feg").getPublicUrl(FilePath);

    const lienRaw = formData.get("lien");
    const lien = typeof lienRaw === "string" && lienRaw.trim() !== "" ? lienRaw.trim() : null;

    const annonce = await prisma.vente.create({
      data: {
        libelle,
        image_url: urlData.publicUrl,
        image_nom: FileName,
        lien,
        taille_image: file.size,
        mime_type: file.type,
        nom_structure: ((formData.get("nom_structure") as string | null) ?? "").trim(),
      },
    });

    return NextResponse.json(annonce, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la publicité:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la publicité" },
      { status: 500 }
    );
  }
}
