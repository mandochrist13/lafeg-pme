import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';


const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'textes-juridiques');

// GET - Récupérer un texte juridique par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const texteJuridique = await prisma.texteJuridique.findUnique({
      where: { id_texteJuridique: params.id }
    });

    if (!texteJuridique) {
      return NextResponse.json(
        { error: 'Texte juridique non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(texteJuridique);
  } catch (error) {
    console.error('Erreur lors de la récupération du texte juridique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du texte juridique' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un texte juridique par ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier si le texte juridique existe
    const existingTexte = await prisma.texteJuridique.findUnique({
      where: { id_texteJuridique: params.id }
    });

    if (!existingTexte) {
      return NextResponse.json(
        { error: 'Texte juridique non trouvé' },
        { status: 404 }
      );
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const file = formData.get('fichier') as File | null;
    
    // Préparation des données de mise à jour
    const updateData: any = {
      titre: formData.get('titre') as string,
      type_texte: formData.get('type_texte') as string,
      categorie: formData.get('categorie') as string,
      description: formData.get('description') as string || null,
      version: formData.get('version') as string || null,
      updatedAt: new Date()
    };

    // Mise à jour de la date de parution si fournie
    if (formData.get('date_parution')) {
      updateData.date_parution = new Date(formData.get('date_parution') as string);
    }

    // Traitement du fichier s'il est fourni
    if (file) {
      // Vérification du type de fichier
      if (file.type !== 'application/pdf') {
        return NextResponse.json(
          { error: 'Seuls les fichiers PDF sont acceptés' },
          { status: 400 }
        );
      }

      // Suppression de l'ancien fichier si existant
      if (existingTexte.fichier_url) {
        const oldFilePath = join(process.cwd(), 'public', existingTexte.fichier_url);
        try {
          if (fs.existsSync(oldFilePath)) {
            await unlink(oldFilePath);
          }
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'ancien fichier:', error);
        }
      }

      // Création d'un nom de fichier unique
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = join(UPLOAD_DIR, fileName);
      
      // Écriture du nouveau fichier
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      
      // Mise à jour des données du fichier
      updateData.fichier_url = `/uploads/textes-juridiques/${fileName}`;
      updateData.fichier_nom = file.name;
      updateData.taille_fichier = buffer.length;
      updateData.mime_type = file.type;
    }

    // Mise à jour dans la base de données
    const updatedTexte = await prisma.texteJuridique.update({
      where: { id_texteJuridique: params.id },
      data: updateData
    });

    return NextResponse.json(updatedTexte);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du texte juridique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du texte juridique' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un texte juridique par ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier si le texte juridique existe
    const texteJuridique = await prisma.texteJuridique.findUnique({
      where: { id_texteJuridique: params.id }
    });

    if (!texteJuridique) {
      return NextResponse.json(
        { error: 'Texte juridique non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le fichier associé
    if (texteJuridique.fichier_url) {
      const filePath = join(process.cwd(), 'public', texteJuridique.fichier_url);
      try {
        if (fs.existsSync(filePath)) {
          await unlink(filePath);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du fichier:', error);
      }
    }

    // Supprimer l'enregistrement de la base de données
    await prisma.texteJuridique.delete({
      where: { id_texteJuridique: params.id }
    });

    return NextResponse.json({ message: 'Texte juridique supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du texte juridique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du texte juridique' },
      { status: 500 }
    );
  }
}