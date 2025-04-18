
import prisma from '@/lib/prisma';
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
    // On extrait l'ID depuis les paramètres de l'URL
    const institutionId = params.id;
    
    // On récupère le corps de la requête (les données que le client veut mettre à jour)
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
        service
    } = body;

    // Vérifie si l'ID est vide ou invalide (optionnel mais conseillé)
    if (!institutionId || typeof institutionId !== 'string') {
        return NextResponse.json({ error: 'ID invalide.' }, { status: 400 });
      }

    const FinancialInstitutions = await prisma.institutionFinanciere.update({
      where: { id_institutionFinanciere : institutionId },
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
        service
      }
    });

    // Retourne l'objet mis à jour avec un code 200 (succès)
    return NextResponse.json({ message: "Institution financiere modifié avec succès", FinancialInstitutions }, { status: 200 });
  } catch (error) {
    // En cas d'erreur inattendue (ex: problème JSON, crash), on log l'erreur et renvoie un code 500
    console.error('Erreur PUT /api/institutions/[id]:', error);
    return NextResponse.json({ error: 'Erreur Interne du Serveur' }, { status: 500 });
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
  