import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient;


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

