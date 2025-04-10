import { NextResponse } from 'next/server';
import { institutionsFinanciere, InstitutionFinanciere } from './data/data'; // Assurez-vous que le chemin est correct

// lire les données 
export async function GET(request: Request) {
  try {
    // Utiliser directement les données fictives importées
    return NextResponse.json(institutionsFinanciere, { status: 200 });
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
        addresse,
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
      const newInstitution: InstitutionFinanciere = {
        id: institutionsFinanciere.length + 1,
        nom,
        categorie,
        type_institution,
        partenaire_feg,
        description,
        logo,
        addresse,
        contact,
        mail,
        site_web,
        rs_1,
        rs_2,
        service,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
      };
  
      institutionsFinanciere.push(newInstitution); // Ajout en mémoire (non persistant)
  
      return NextResponse.json(newInstitution, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Erreur Interne du Serveur' }, { status: 500 });
    }
  }

