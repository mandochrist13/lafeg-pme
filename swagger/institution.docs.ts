/**
 * @swagger
 * components:
 *   schemas:
 *     InstitutionFinanciere:
 *       type: object
 *       required:
 *         - id_institutionFinanciere
 *         - nom
 *         - categorie
 *         - type_institution
 *       properties:
 *         id_institutionFinanciere:
 *           type: string
 *           description: Identifiant unique de l'institution
 *         nom:
 *           type: string
 *           description: Nom de l'institution
 *         categorie:
 *           type: string
 *           description: Catégorie de l'institution
 *         type_institution:
 *           type: string
 *           description: Type d'institution
 *         partenaire_feg:
 *           type: boolean
 *           nullable: true
 *           description: Indique si c'est un partenaire FEG
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description détaillée
 *         logo:
 *           type: string
 *           nullable: true
 *           description: URL du logo
 *         logo_nom:
 *           type: string
 *           nullable: true
 *           description: Nom du fichier logo dans Supabase Storage
 *         adresse:
 *           type: string
 *           nullable: true
 *           description: Adresse physique
 *         contact:
 *           type: string
 *           nullable: true
 *           description: Numéro de téléphone
 *         mail:
 *           type: string
 *           nullable: true
 *           description: Adresse email
 *         site_web:
 *           type: string
 *           nullable: true
 *           description: Site web
 *         rs_1:
 *           type: string
 *           nullable: true
 *           description: Lien réseau social 1
 *         rs_2:
 *           type: string
 *           nullable: true
 *           description: Lien réseau social 2
 *         service:
 *           type: string
 *           nullable: true
 *           description: Services proposés
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 * 
 * @swagger
 * /api/FinancialInstitution:
 *   get:
 *     summary: Récupérer la liste des institutions financières
 *     tags: [Institutions Financières]
 *     responses:
 *       200:
 *         description: Liste des institutions récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InstitutionFinanciere'
 *       500:
 *         description: Erreur serveur
 * 
 *   post:
 *     summary: Créer une nouvelle institution financière
 *     tags: [Institutions Financières]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - categorie
 *               - type_institution
 *             properties:
 *               nom:
 *                 type: string
 *               categorie:
 *                 type: string
 *               type_institution:
 *                 type: string
 *               partenaire_feg:
 *                 type: boolean
 *               description:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Image au format JPEG ou PNG
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
 *         description: Institution créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstitutionFinanciere'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 * 
 * @swagger
 * /api/FinancialInstitution/{id}:
 *   get:
 *     summary: Récupérer une institution financière par ID
 *     tags: [Institutions Financières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'institution
 *     responses:
 *       200:
 *         description: Institution trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstitutionFinanciere'
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur serveur
 * 
 *   put:
 *     summary: Mettre à jour une institution financière
 *     tags: [Institutions Financières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'institution
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *                 type: boolean
 *               description:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Image au format JPEG ou PNG
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
 *         description: Institution mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstitutionFinanciere'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur serveur
 * 
 *   delete:
 *     summary: Supprimer une institution financière
 *     tags: [Institutions Financières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'institution
 *     responses:
 *       200:
 *         description: Institution supprimée avec succès
 *       404:
 *         description: Institution non trouvée
 *       500:
 *         description: Erreur serveur
 */