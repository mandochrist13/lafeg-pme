import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/publicites:
 *   get:
 *     summary: Récupère toutes les publicités
 *     description: Renvoie la liste de toutes les publicités, triées par date de création (les plus récentes d'abord)
 *     tags: [Publicités]
 *     responses:
 *       200:
 *         description: Liste des publicités récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publicite'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la récupération des publicités"
 */
export async function GET() {

  try {
    const publicites = await prisma.publicite.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(publicites);

  } catch (error) {

    console.error('Erreur lors de la récupération des publicités:', error);

    return NextResponse.json(
      { error: 'Erreur lors de la récupération des publicités' },
      { status: 500 }
    );

  }
}


/**
 * @swagger
 * /api/publicites:
 *   post:
 *     summary: Crée une nouvelle publicité
 *     description: Crée une nouvelle publicité avec les données fournies dans le formulaire
 *     tags: [Publicités]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Libellé de la publicité
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image de la publicité (JPEG ou PNG)
 *               nom_structure:
 *                 type: string
 *                 description: Nom de la structure associée à la publicité
 *     responses:
 *       201:
 *         description: Publicité créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publicite'
 *       400:
 *         description: Erreur de validation des données d'entrée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

export async function POST(request: NextRequest) {
  
  try {
    // Vérifier que la requête est bien de type multipart/form-data
    const ContentType = request.headers.get('content-type')

    if (!ContentType || !ContentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { erreur: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      )
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const file = formData.get('image') as File


    if (!file) {
      return NextResponse.json(
        { erreur: 'Fichier requis' },
        { status: 400 }
      );
    }

    // Traitement du logo s'il est fourni
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      return NextResponse.json(
          { error: 'Le logo doit être au format JPEG ou PNG' },
          { status: 400 }
        );
    }

    // Création d'un nom de fichier unique
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const FileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const FilePath = `publicites/${FileName}`;

    // Upload du fichier vers Supabase Storage
    const { data, error } = await supabase.storage
      .from('feg')
      .upload(FilePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    // Vérification de l'upload
    if (error) {
      console.error(`Erreur de l'upload:`, error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabase
      .storage
      .from('feg')
      .getPublicUrl(FilePath)

    // Récupération des données du formulaire
    const libelle = formData.get('libelle') as string;
    const nom_structure = formData.get('nom_structure') as string;

    // Créer la publicité dans la base de données
    const publicite = await prisma.publicite.create(
      {
        data: {
          libelle,
          image_url: urlData.publicUrl,
          image_nom: file.name,
          taille_image: file.size,
          mime_type: file.type,
          nom_structure,
        }
      }
    )

    return NextResponse.json(publicite, { status: 201 });

  } catch (error) {

    console.error('Erreur lors de la création de la publicité:', error);

    return NextResponse.json(
      { error: 'Erreur lors de la création de la publicité' },
      { status: 500 }
    );

  }
}

