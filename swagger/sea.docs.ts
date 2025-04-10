/**
 * @swagger
 * /sea/{id}:
 *   get:
 *     summary: Récupérer les informations d'une Structure d’Accompagnement par ID
 *     tags: [Structure d’Accompagnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Structure d’Accompagnement à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Données de la Structure d’Accompagnement récupérées avec succès
 *       404:
 *         description: Structure d’Accompagnement non trouvée
 *       500:
 *         description: Erreur serveur
 */


/**
 * @swagger
 * /sea:
 *   patch:
 *     summary: Modifier partiellement les informations d'une Structure d’Accompagnement
 *     tags: [Structure d’Accompagnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Structure d’Accompagnement à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Champs à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Mise à jour partielle réussie
 *       404:
 *         description: Structure d’Accompagnement non trouvée
 *       500:
 *         description: Erreur lors de la mise à jour
 */

/**
 * @swagger
 * /sea:
 *   delete:
 *     summary: Supprimer une Structure d’Accompagnement
 *     tags: [Structure d’Accompagnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Structure d’Accompagnement à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Suppression réussie
 *       404:
 *         description: Structure d’Accompagnement non trouvée
 *       500:
 *         description: Erreur lors de la suppression
 */

/**
 * @swagger
 * /sea:
 *   put:
 *     summary: Modifier entièrement une Structure d’Accompagnement
 *     tags: [Structure d’Accompagnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Structure d’Accompagnement à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Données complètes de la Structure d’Accompagnement
 *       required: true
 *       content:
 *         application/json:
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
 *                 type: array
 *                 items:
 *                   type: string
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
 *               partenaire_feg:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Mise à jour complète réussie
 *       404:
 *         description: Structure d’Accompagnement non trouvée
 *       500:
 *         description: Erreur lors de la mise à jour
 */


/**
 * @swagger
 * /sea:
 *   post:
 *     summary: Créer une nouvelle Structure d’Accompagnement
 *     tags: [Structure d’Accompagnement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - type_sea
 *               - categorie
 *             properties:
 *               nom:
 *                 type: string
 *                 description: "Nom de la Structure d’Accompagnement"
 *               description:
 *                 type: string
 *                 description: "Description facultative"
 *               type_sea:
 *                 type: string
 *                 description: "Type de structure (ex: Incubateur, FabLab…)"
 *               categorie:
 *                 type: string
 *                 description: "Catégorie (publique, privée, etc.)"
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Liste des services proposés"
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
 *                 description: "Réseau social 1"
 *               rs_2:
 *                 type: string
 *                 description: "Réseau social 2"
 *               logo:
 *                 type: string
 *                 description: "URL du logo"
 *               partenaire_feg:
 *                 type: boolean
 *                 description: "Est-ce un partenaire FEG ?"
 *     responses:
 *       201:
 *         description: "Structure d’Accompagnement créée avec succès"
 *       400:
 *         description: "Requête invalide"
 *       500:
 *         description: "Erreur serveur"
 */


/**
 * @swagger
 * /sea:
 *   get:
 *     summary: Récupérer la liste de toutes les Structures d’Accompagnement
 *     tags: [Structure d’Accompagnement]
 *     responses:
 *       200:
 *         description: "Liste des Structures d’Accompagnement récupérée avec succès"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_sea:
 *                     type: string
 *                     description: "Identifiant unique de la structure"
 *                   nom:
 *                     type: string
 *                     description: "Nom de la structure"
 *                   type_sea:
 *                     type: string
 *                     description: "Type de structure"
 *                   categorie:
 *                     type: string
 *                     description: "Catégorie de la structure"
 *                   services:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: "Services proposés"
 *                   adresse:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   mail:
 *                     type: string
 *                   site_web:
 *                     type: string
 *                   rs_1:
 *                     type: string
 *                   rs_2:
 *                     type: string
 *                   logo:
 *                     type: string
 *                   partenaire_feg:
 *                     type: boolean
 *       500:
 *         description: "Erreur serveur"
 */
