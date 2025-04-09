import { NextResponse } from 'next/server';
import { testSeaList } from './data';

// Lecture (GET)
// (GET) http://localhost:3000/api/sea
export async function GET(request: Request) {
  try {
    return NextResponse.json(testSeaList, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sea' }, { status: 500 });
  }
}

// Création (POST)
// (POST) http://localhost:3000/api/sea
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.nom || !data.type_sea || !data.categorie) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Générer un nouvel ID (simple incrément par rapport à la taille du tableau)
    const newId = (testSeaList.length + 1).toString();

    const newSea = {
      id_sea: newId,
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
    };

    // Ajouter le nouvel objet dans le tableau
    testSeaList.push(newSea);

    return NextResponse.json(newSea, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}

