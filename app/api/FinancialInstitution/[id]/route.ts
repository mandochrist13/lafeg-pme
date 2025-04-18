import prisma from '@/lib/prisma';
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/FinancialInstitution/{id}:
 *   get:
 *     summary: Afficher une institution financière par ID
 *     description: Cette route récupère une institution financière spécifique en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID de l'institution financière à récupérer
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-fA-F0-9]{24}$' # Format MongoDB
 *     responses:
 *       200:
 *         description: Institution financière récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       400:
 *         description: ID invalide (format MongoDB attendu)
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

// Afficher les institutions financières par ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
  
    // Vérifie que l'ID est bien un ObjectId MongoDB
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return NextResponse.json({ error: 'ID invalide (format MongoDB attendu).' }, { status: 400 });
    }
  
    try {
      // Affiche l'institution financière par son ID
      const institution = await prisma.institutionFinanciere.findUnique({
        where: { id_institutionFinanciere: id },
      });
      
      // Vérifie si l'institution existe
      if (!institution) {
        return NextResponse.json({ error: 'Institution non trouvée.' }, { status: 404 });
      }
  
      return NextResponse.json(institution, { status: 200 });
    } catch (error) {
      console.error('Erreur GET /api/FinancialInstitution/[id]:', error);
      return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
  }


  /**
 * @swagger
 * /api/FinancialInstitution/{id}:
 *   put:
 *     summary: Modifier une institution financière par ID
 *     description: Cette route permet de modifier les informations d'une institution financière en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID de l'institution financière à modifier
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-fA-F0-9]{24}$' # Format MongoDB
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
 *       200:
 *         description: Institution modifiée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       400:
 *         description: ID invalide ou champs manquants
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

// Fonction qui s'exécute quand une requête PUT est envoyée à /api/institutions/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) { 
  try {
    const id = params.id;
    
    // Vérifier que la requête est bien de type multipart/form-data
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    // Récupérer l'institution existante
    const existingInstitution = await prisma.institutionFinanciere.findUnique({
      where: { id_institutionFinanciere: id },
    });

    if (!existingInstitution) {
      return NextResponse.json(
        { error: 'Institution non trouvée' },
        { status: 404 }
      );
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const updates: any = {};

    // Mise à jour des champs texte
    for (const field of ['nom', 'categorie', 'type_institution', 'description', 'adresse', 'contact', 'mail', 'site_web', 'rs_1', 'rs_2', 'service']) {
      const value = formData.get(field);
      if (value !== null) {
        updates[field] = value as string;
      }
    }

    // Traitement du champ booléen
    const partenaire_feg = formData.get('partenaire_feg');
    if (partenaire_feg !== null) {
      updates.partenaire_feg = partenaire_feg === 'true';
    }

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

      // Supprimer l'ancien logo s'il existe
      if (existingInstitution.logo_nom) {
        const { error: deleteError } = await supabase.storage
          .from('feg')
          .remove([`institutions/${existingInstitution.logo_nom}`]);

        if (deleteError) {
          console.error('Erreur lors de la suppression de l\'ancien logo:', deleteError);
        }
      }

      // Upload du nouveau logo
      const timestamp = Date.now();
      const fileName = `${timestamp}-${logo.name.replace(/\s+/g, '-')}`;
      const filePath = `institutions/${fileName}`;

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

      updates.logo = urlData.publicUrl;
      updates.logo_nom = fileName;
    }

    // Mise à jour en base de données
    const updatedInstitution = await prisma.institutionFinanciere.update({
      where: { id_institutionFinanciere:id },
      data: updates
    });

    return NextResponse.json(updatedInstitution);
  } catch (error) {
    console.error('Erreur PUT /api/institutions/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur Interne du Serveur' },
      { status: 500 }
    );
  }
}


/**
 * @swagger
 * /api/FinancialInstitution/{id}:
 *   delete:
 *     summary: Supprimer une institution financière par ID
 *     description: Cette route permet de supprimer une institution financière en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID de l'institution financière à supprimer
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-fA-F0-9]{24}$' # Format MongoDB
 *     responses:
 *       200:
 *         description: Institution supprimée avec succès
 *       400:
 *         description: ID invalide (format MongoDB attendu)
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur serveur ou ID non trouvé
 */

// Supprimer une institution financière
export async function DELETE( request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
  
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return NextResponse.json({ error: 'ID Mongo invalide (format).' }, { status: 400 });
    }
  
    try {
      const deleted = await prisma.institutionFinanciere.delete({
        where: { id_institutionFinanciere: id },
      });
  
      return NextResponse.json({ message: 'Institution supprimée' }, { status: 200 });
    } catch (error) {
      console.error('Erreur DELETE:', error);
      return NextResponse.json({ error: 'Erreur serveur ou ID non trouvé' }, { status: 500 });
    }
  }
