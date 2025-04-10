import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';


/**
 * @swagger
 * /sea:
 *   get:
 *     summary: Recuperer la liste des sea
 *     tags: [sea]
 *     responses:
 *       200:
 *         description: Succès
 */

// Lecture (GET)
// (GET) http://localhost:3000/api/sea

const prisma = new PrismaClient

export async function GET(request: Request) {
  try {
    const sea =  await prisma.sEA.findMany()
    return NextResponse.json(sea, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sea' }, { status: 500 });
  }
}



// Création (POST)
// (POST) http://localhost:3000/api/sea



export async function POST(request: Request) {
  try {
    const data = await request.json();

    // On verfifie si les champs obligatoires ont ete remplis ou pas
    if (!data.nom || !data.type_sea || !data.categorie) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Utiliser Prisma pour insérer de nouvelles données dans la base de données
    const newSea = await prisma.sEA.create({
      data: {
        nom: data.nom,
        description: data.description || '',
        type_sea: data.type_sea,
        categorie: data.categorie,
        services: data.services || [],
        adresse: data.adresse || '',
        contact: data.contact || null,
        mail: data.mail || null,
        site_web: data.site_web || null,
        rs_1: data.rs_1 || null,
        rs_2: data.rs_2 || null,
        logo: data.logo || null,
        partenaire_feg: data.partenaire_feg || false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
     // Réponse avec l'objet créé
     return NextResponse.json(newSea, { status: 201 });

    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Erreur lors de la création' },
        { status: 500 }
      );
    }
  }
