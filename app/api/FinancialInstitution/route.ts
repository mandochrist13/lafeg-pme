import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';




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
 *     description: Cette route permet d'ajouter une nouvelle institution financière dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               categorie:
 *                 type: string
 *               type_institution:
 *                 type: string
 *               partenaire_feg:
 *                 type: string
 *               description:
 *                 type: string
 *               logo:
 *                 type: string
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinancialInstitution'
 *       400:
 *         description: Champs manquants dans la requête
 *       500:
 *         description: Erreur interne du serveur
 */

// ajouter une nouvelle institution
export async function POST(request: Request) {
    try {
      const body = await request.json();
  
      const {
        nom,
        categorie,
        type_institution,
        partenaire_feg,
        description,
        logo,
        adresse,
        contact,
        mail,
        site_web,
        rs_1,
        rs_2,
        service,
      } = body;
  
      // Validation minimale
      if (!nom || !categorie || !type_institution) {
        return NextResponse.json({ error: 'Les champs nom, categorie et type_institution sont requis.' }, { status: 400 });
      }
  
      // création d'un nouvel objet InstitutionFinanciere
      const newInstitution = await prisma.institutionFinanciere.create({
        data: {
          nom,
          categorie,
          type_institution,
          partenaire_feg,
          description,
          logo,
          adresse,
          contact,
          mail,
          site_web,
          rs_1,
          rs_2,
          service,
        },
    });

    return NextResponse.json({message : "Institution créer avec succès" , newInstitution}, { status: 201 });

    } catch (error) {
      console.error(error);
      // Retourne une reponse erreur avec le statut 500 en cas d'échec
      return NextResponse.json({ error: 'Erreur Interne du Serveur' }, { status: 500 });
    }
  }

