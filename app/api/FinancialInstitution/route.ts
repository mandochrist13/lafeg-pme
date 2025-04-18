import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
}

/**
 * @swagger
 * /api/FinancialInstitution:
 *   get:
 *     summary: Récupérer toutes les institutions financières
 *     description: Cette route récupère toutes les institutions financières de la base de données.
 *     responses:
 *       200:
 *         description: Liste des institutions financières récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FinancialInstitution'
 *       500:
 *         description: Erreur interne du serveur
 */

// Afficher toutes les institutions financières 
export async function GET(request: Request) {
  try {
    const FinancialInstitutions = await prisma.institutionFinanciere.findMany();
    return NextResponse.json(FinancialInstitutions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur Interne du Serveur' }, { status: 500 });
  }
}



/**
 * @swagger
 * /api/FinancialInstitution:
 *   post:
 *     summary: Ajouter une nouvelle institution financière
 *     description: Cette route permet d'ajouter une nouvelle institution financière avec upload de logo
 *     tags: [Institutions Financières]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - categorie
 *               - type_institution
 *             properties:
 *               nom:
 *                 type: string
 *               categorie:
 *                 type: string
 *               type_institution:
 *                 type: string
 *               partenaire_feg:
 *                 type: boolean
 *               description:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Image au format JPEG ou PNG
 *               adresse:
 *                 type: string
 *               contact:
 *                 type: string
 *               mail:
 *                 type: string
 *               site_web:
 *                 type: string
 *               rs_1:
 *                 type: string
 *               rs_2:
 *                 type: string
 *               service:
 *                 type: string
 *     responses:
 *       201:
 *         description: Institution financière créée avec succès
 *       400:
 *         description: Données invalides ou fichier incorrect
 *       500:
 *         description: Erreur serveur
 */

export async function POST(request: Request) {

  try {
    // Vérifier que la requête est bien de type multipart/form-data
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    // Traitement du formulaire
    const formData = await request.formData();
    
    // Récupération des données du formulaire
    const nom = formData.get('nom') as string;
    const categorie = formData.get('categorie') as string;
    const type_institution = formData.get('type_institution') as string;
    const partenaire_feg = formData.get('partenaire_feg') === 'true';
    const description = formData.get('description') as string || null;
    const adresse = formData.get('adresse') as string || null;
    const contact = formData.get('contact') as string || null;
    const mail = formData.get('mail') as string || null;
    const site_web = formData.get('site_web') as string || null;
    const rs_1 = formData.get('rs_1') as string || null;
    const rs_2 = formData.get('rs_2') as string || null;
    const service = formData.get('service') as string || null;

    // Validation minimale
    if (!nom || !categorie || !type_institution) {
      return NextResponse.json(
        { error: 'Les champs nom, categorie et type_institution sont requis.' },
        { status: 400 }
      );
    }

    let logo_url = null;
    let logo_nom = null;

    // Traitement du logo s'il est fourni
    const logo = formData.get('logo') as File;
    if (logo) {
      // Vérification du type de fichier
      if (!logo.type.match(/^image\/(jpeg|png)$/)) {
        return NextResponse.json(
          { error: 'Le logo doit être au format JPEG ou PNG' },
          { status: 400 }
        );
      }

      // Création d'un nom unique pour le fichier
      const timestamp = Date.now();
      const fileName = `${timestamp}-${logo.name.replace(/\s+/g, '-')}`;
      const filePath = `institution-financiere/${fileName}`;

      // Upload du fichier vers Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('feg')
        .upload(filePath, logo, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erreur lors de l\'upload du logo:', uploadError);
        return NextResponse.json(
          { error: 'Erreur lors de l\'upload du logo' },
          { status: 500 }
        );
      }

      // Récupération de l'URL publique
      const { data: urlData } = supabase.storage
        .from('feg')
        .getPublicUrl(filePath);

      logo_url = urlData.publicUrl;
      logo_nom = fileName;
    }

    // Création dans la base de données
    const newInstitution = await prisma.institutionFinanciere.create({
      data: {
        nom,
        categorie,
        type_institution,
        partenaire_feg,
        description,
        logo: logo_url,
        logo_nom,
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
    console.error('Erreur lors de la création de l\'institution:', error);
    return NextResponse.json(
      { error: 'Erreur Interne du Serveur' },
      { status: 500 }
    );
  }
}

