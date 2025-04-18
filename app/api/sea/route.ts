import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
}

// Lecture (GET)
// (GET) http://localhost:3000/api/sea

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
    const type_sea = formData.get('type_sea') as string;
    const categorie = formData.get('categorie') as string;
    const description = formData.get('description') as string || '';
    const services = JSON.parse(formData.get('services') as string || '[]');
    const adresse = formData.get('adresse') as string || '';
    const contact = formData.get('contact') as string || null;
    const mail = formData.get('mail') as string || null;
    const site_web = formData.get('site_web') as string || null;
    const rs_1 = formData.get('rs_1') as string || null;
    const rs_2 = formData.get('rs_2') as string || null;
    const partenaire_feg = formData.get('partenaire_feg') === 'true';

    // Validation des champs requis
    if (!nom || !type_sea || !categorie) {
      return NextResponse.json(
        { error: 'Les champs nom, type_sea et categorie sont requis.' },
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
      const filePath = `sea/${fileName}`;

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
        logo: logo_url,
        logo_nom,
        partenaire_feg,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newSea, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}
