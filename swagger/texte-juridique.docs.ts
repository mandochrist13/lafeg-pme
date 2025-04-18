/**
 * @swagger
 * components:
 *   schemas:
 *     TexteJuridique:
 *       type: object
 *       required:
 *         - id_texteJuridique
 *         - titre
 *         - type_texte
 *         - fichier_url
 *         - fichier_nom
 *         - categorie
 *         - date_parution
 *       properties:
 *         id_texteJuridique:
 *           type: string
 *           description: Identifiant unique du texte juridique
 *         titre:
 *           type: string
 *           description: Titre du texte juridique
 *         type_texte:
 *           type: string
 *           description: Type de texte (loi, décret, arrêté, etc.)
 *         fichier_url:
 *           type: string
 *           description: URL d'accès au fichier PDF
 *         fichier_nom:
 *           type: string
 *           description: Nom du fichier dans Supabase Storage
 *         taille_fichier:
 *           type: integer
 *           nullable: true
 *           description: Taille du fichier en octets
 *         mime_type:
 *           type: string
 *           description: Type MIME du fichier (application/pdf)
 *         categorie:
 *           type: string
 *           description: Catégorie du texte
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description ou résumé du texte
 *         date_parution:
 *           type: string
 *           format: date-time
 *           description: Date de parution officielle
 *         version:
 *           type: string
 *           nullable: true
 *           description: Version du texte
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création dans le système
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 * 
 * @swagger
 * /api/texte-juridique:
 *   get:
 *     summary: Récupérer la liste des textes juridiques
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de la page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtre par catégorie
 *       - in: query
 *         name: type_texte
 *         schema:
 *           type: string
 *         description: Filtre par type de texte
 *     responses:
 *       200:
 *         description: Liste des textes juridiques récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TexteJuridique'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Erreur serveur
 * 
 *   post:
 *     summary: Créer un nouveau texte juridique
 *     tags: [Textes Juridiques]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - type_texte
 *               - categorie
 *               - date_parution
 *               - fichier
 *             properties:
 *               titre:
 *                 type: string
 *               type_texte:
 *                 type: string
 *               categorie:
 *                 type: string
 *               description:
 *                 type: string
 *               date_parution:
 *                 type: string
 *                 format: date
 *               version:
 *                 type: string
 *               fichier:
 *                 type: string
 *                 format: binary
 *                 description: Fichier PDF du texte juridique
 *     responses:
 *       201:
 *         description: Texte juridique créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TexteJuridique'
 *       400:
 *         description: Données invalides ou fichier incorrect
 *       500:
 *         description: Erreur serveur
 * 
 * @swagger
 * /api/texte-juridique/{id}:
 *   get:
 *     summary: Récupérer un texte juridique par ID
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du texte juridique
 *     responses:
 *       200:
 *         description: Texte juridique trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TexteJuridique'
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 * 
 *   put:
 *     summary: Mettre à jour un texte juridique
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du texte juridique
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               type_texte:
 *                 type: string
 *               categorie:
 *                 type: string
 *               description:
 *                 type: string
 *               date_parution:
 *                 type: string
 *                 format: date
 *               version:
 *                 type: string
 *               fichier:
 *                 type: string
 *                 format: binary
 *                 description: Nouveau fichier PDF (optionnel)
 *     responses:
 *       200:
 *         description: Texte juridique mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TexteJuridique'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 * 
 *   delete:
 *     summary: Supprimer un texte juridique
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du texte juridique
 *     responses:
 *       200:
 *         description: Texte juridique supprimé avec succès
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 */