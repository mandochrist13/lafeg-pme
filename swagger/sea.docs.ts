/**
 * @swagger
 * components:
 *   schemas:
 *     SEA:
 *       type: object
 *       required:
 *         - id_sea
 *         - nom
 *         - type_sea
 *         - categorie
 *       properties:
 *         id_sea:
 *           type: string
 *           description: Identifiant unique de la structure
 *         nom:
 *           type: string
 *           description: Nom de la structure
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description détaillée de la structure
 *         type_sea:
 *           type: string
 *           description: Type de structure (ex. incubateur, accélérateur)
 *         categorie:
 *           type: string
 *           description: Catégorie de la structure
 *         services:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des services proposés
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
 *         logo:
 *           type: string
 *           nullable: true
 *           description: URL du logo
 *         logo_nom:
 *           type: string
 *           nullable: true
 *           description: Nom du fichier logo dans Supabase Storage
 *         partenaire_feg:
 *           type: boolean
 *           nullable: true
 *           description: Indique si c'est un partenaire FEG
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
 * /api/sea:
 *   get:
 *     summary: Récupérer la liste des structures d'accompagnement
 *     tags: [Structures d'Accompagnement]
 *     responses:
 *       200:
 *         description: Liste des structures récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SEA'
 *       500:
 *         description: Erreur serveur
 * 
 *   post:
 *     summary: Créer une nouvelle structure d'accompagnement
 *     tags: [Structures d'Accompagnement]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - type_sea
 *               - categorie
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               type_sea:
 *                 type: string
 *               categorie:
 *                 type: string
 *               services:
 *                 type: string
 *                 format: json
 *                 description: JSON array de services
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
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Image au format JPEG ou PNG
 *               partenaire_feg:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Structure créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SEA'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 * 
 * @swagger
 * /api/sea/{id}:
 *   get:
 *     summary: Récupérer une structure d'accompagnement par ID
 *     tags: [Structures d'Accompagnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la structure
 *     responses:
 *       200:
 *         description: Structure trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SEA'
 *       404:
 *         description: Structure non trouvée
 *       500:
 *         description: Erreur serveur
 * 
 *   put:
 *     summary: Mettre à jour une structure d'accompagnement
 *     tags: [Structures d'Accompagnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la structure
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               type_sea:
 *                 type: string
 *               categorie:
 *                 type: string
 *               services:
 *                 type: string
 *                 format: json
 *                 description: JSON array de services
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
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Image au format JPEG ou PNG
 *               partenaire_feg:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Structure mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SEA'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Structure non trouvée
 *       500:
 *         description: Erreur serveur
 * 
 *   delete:
 *     summary: Supprimer une structure d'accompagnement
 *     tags: [Structures d'Accompagnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la structure
 *     responses:
 *       200:
 *         description: Structure supprimée avec succès
 *       404:
 *         description: Structure non trouvée
 *       500:
 *         description: Erreur serveur
 */
