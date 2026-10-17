import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { exigerAdmin } from "@/lib/api-auth";
import { lireDate, lirePagination } from "@/lib/api-utils";
import {
  CHAMPS_TEXTE_OFFRE,
  EMAIL_REGEX,
  STATUTS_OFFRE,
  type StatutOffre,
  lireCorpsOffre,
  televerserFichierOffre,
  validerFichiersOffre,
} from "@/lib/offres-api";

/**
 * @swagger
 * /api/offres:
 *   get:
 *     tags:
 *       - Offres
 *     summary: Récupérer la liste des offres
 *     description: |
 *       Récupère une liste paginée des offres avec possibilité de filtrage et de recherche.
 *     parameters:
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
 *       - in: query
 *         name: type_offre
 *         schema:
 *           type: string
 *       - in: query
 *         name: membre_feg
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *       - in: query
 *         name: statut
 *         schema:
 *           type: string
 *           enum: [ACTIF, INACTIF, ARCHIVE]
 *       - in: query
 *         name: localisation
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des offres récupérée avec succès
 *       400:
 *         description: Paramètres invalides
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = lirePagination(searchParams, { limitDefaut: 10, limitMax: 1000 });
    const type_offre = searchParams.get("type_offre");
    const membre_feg = searchParams.get("membre_feg");
    const statut = searchParams.get("statut");
    const localisation = searchParams.get("localisation");
    const search = searchParams.get("search");

    const where: any = {};

    if (type_offre) where.type_offre = type_offre;
    if (membre_feg === "true" || membre_feg === "false") where.membre_feg = membre_feg === "true";
    if (statut) {
      if (!STATUTS_OFFRE.includes(statut as StatutOffre)) {
        return NextResponse.json(
          { success: false, error: `Statut invalide (attendu : ${STATUTS_OFFRE.join(", ")})` },
          { status: 400 }
        );
      }
      where.statut = statut;
    }
    if (localisation) where.localisation = { contains: localisation, mode: "insensitive" };

    if (search) {
      where.OR = [
        { titre_offre: { contains: search, mode: "insensitive" } },
        { nom_structure: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [offres, total] = await Promise.all([
      prisma.offre.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.offre.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: offres,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des offres:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la récupération des offres" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/offres:
 *   post:
 *     tags:
 *       - Offres
 *     summary: Créer une nouvelle offre avec fichiers
 *     description: |
 *       Crée une nouvelle offre (multipart/form-data). Fichiers acceptés :
 *       `image` et `banniere` (JPEG/PNG), `fichier` (PDF). Authentification administrateur requise.
 *     responses:
 *       201:
 *         description: Offre créée avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
export async function POST(req: NextRequest) {
  const refus = await exigerAdmin();
  if (refus) return refus;

  try {
    const { body, files } = await lireCorpsOffre(req);

    // Champs obligatoires
    const manquants = ["titre_offre", "nom_structure", "type_offre", "contact", "email", "localisation"].filter(
      (c) => typeof body[c] !== "string" || !body[c].trim()
    );
    if (manquants.length) {
      return NextResponse.json(
        { success: false, error: `Champs requis manquants : ${manquants.join(", ")}` },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json({ success: false, error: "Email non valide" }, { status: 400 });
    }

    const dateDebut = lireDate(body.date_debut);
    const dateFin = lireDate(body.date_fin);
    if (!dateDebut || !dateFin) {
      return NextResponse.json(
        { success: false, error: "Les dates de début et de fin sont requises et doivent être valides" },
        { status: 400 }
      );
    }
    if (dateDebut >= dateFin) {
      return NextResponse.json(
        { success: false, error: "La date de fin doit être postérieure à la date de début" },
        { status: 400 }
      );
    }

    const statut: StatutOffre = body.statut ? body.statut : "INACTIF";
    if (!STATUTS_OFFRE.includes(statut)) {
      return NextResponse.json(
        { success: false, error: `Statut invalide (attendu : ${STATUTS_OFFRE.join(", ")})` },
        { status: 400 }
      );
    }

    // Validation des fichiers AVANT tout téléversement
    const erreurFichier = validerFichiersOffre(files);
    if (erreurFichier) {
      return NextResponse.json({ success: false, error: erreurFichier }, { status: 400 });
    }

    let image_url: string | null = null, image_nom: string | null = null;
    let bannier_url: string | null = null, bannier_nom: string | null = null;
    let fichier_url = "", fichier_nom = "";

    if (files.image) ({ url: image_url, nom: image_nom } = await televerserFichierOffre(files.image));
    if (files.banniere) ({ url: bannier_url, nom: bannier_nom } = await televerserFichierOffre(files.banniere));
    if (files.fichier) ({ url: fichier_url, nom: fichier_nom } = await televerserFichierOffre(files.fichier));

    const data: Record<string, any> = {
      membre_feg: body.membre_feg === "true" || body.membre_feg === true,
      date_debut: dateDebut,
      date_fin: dateFin,
      statut,
      image_url,
      image_nom,
      bannier_url,
      bannier_nom,
      fichier_url,
      fichier_nom,
    };
    for (const champ of CHAMPS_TEXTE_OFFRE) {
      if (typeof body[champ] === "string") data[champ] = body[champ].trim();
    }
    if (!data.site_web) data.site_web = "";

    const offre = await prisma.offre.create({ data: data as any });

    return NextResponse.json(
      { success: true, data: offre, message: "Offre créée avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'offre:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la création de l'offre" },
      { status: 500 }
    );
  }
}
