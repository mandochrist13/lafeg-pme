import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from "next/server";


export const config = {
  api: {
    bodyParser: false,
  },
}

// Configuration pour le stockage des fichiers
// const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'textes-juridiques');

// Fonction utilitaire pour assurer que le répertoire d'upload existe
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Erreur lors de la création du répertoire d\'upload:', error);
  }
}

// GET - Récupérer tous les textes juridiques
export async function GET(request: NextRequest) {
  try {
    // Gestion des paramètres de filtrage et pagination
    const searchParams = request.nextUrl.searchParams;
    const categorie = searchParams.get('categorie');
    const type = searchParams.get('type_texte');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Construction du filtre
    const where: any = {};
    if (categorie) where.categorie = categorie;
    if (type) where.type_texte = type;

    // Récupération des textes juridiques avec pagination
    const [textes, total] = await Promise.all([
      prisma.texteJuridique.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date_parution: 'desc' }
      }),
      prisma.texteJuridique.count({ where })
    ]);

    return NextResponse.json({
      data: textes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des textes juridiques:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des textes juridiques' },
      { status: 500 }
    );
  }
}


// POST - Créer un nouveau texte juridique avec upload de fichier
export async function POST(request: NextRequest) {

  try {

    // Vérifier que la requête est bien de type multipart/form-data
    const contentType = request.headers.get('content-type');

    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    // Préparation pour l'upload
    // await ensureUploadDir();

    // Traitement du formulaire
    const formData = await request.formData();
    const file = formData.get('fichier') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Fichier PDF requis' },
        { status: 400 }
      );
    }

    // Vérification du type de fichier
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Seuls les fichiers PDF sont acceptés' },
        { status: 400 }
      );
    }

    // Création d'un nom de fichier unique
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    // const filePath = join(UPLOAD_DIR, fileName);
    const filePath = `texte-juridique/${fileName}`
    // Écriture du fichier sur le serveur
    // const buffer = Buffer.from(await file.arrayBuffer());
    // await writeFile(filePath, buffer);
    const { data, error } = await supabase.storage
      .from('feg')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Erreur d\'upload:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabase
      .storage
      .from('feg')
      .getPublicUrl(filePath)


    // Récupération des données du formulaire
    const titre = formData.get('titre') as string;
    const type_texte = formData.get('type_texte') as string;
    const categorie = formData.get('categorie') as string;
    const description = formData.get('description') as string || null;
    const date_parution = new Date(formData.get('date_parution') as string);
    const version = formData.get('version') as string || null;

    // URL relative pour l'accès au fichier
    // const fichier_url = `/uploads/textes-juridiques/${fileName}`;

    // Création dans la base de données
    const texteJuridique = await prisma.texteJuridique.create({
      data: {
        titre,
        type_texte,
        fichier_url: urlData.publicUrl,
        fichier_nom: fileName,
        taille_fichier: file.size,
        mime_type: file.type,
        categorie,
        description,
        date_parution,
        version
      },
    });

    return NextResponse.json(texteJuridique, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du texte juridique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du texte juridique' },
      { status: 500 }
    );
  }
}