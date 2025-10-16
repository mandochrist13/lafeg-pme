-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATEUR', 'EDITEUR', 'UTILISATEUR');

-- CreateEnum
CREATE TYPE "StatutOffre" AS ENUM ('ACTIF', 'INACTIF', 'ARCHIVE');

-- CreateTable
CREATE TABLE "texte_juridique" (
    "id_texteJuridique" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "type_texte" TEXT NOT NULL,
    "fichier_url" TEXT NOT NULL,
    "fichier_nom" TEXT NOT NULL,
    "taille_fichier" INTEGER,
    "mime_type" TEXT NOT NULL DEFAULT 'application/pdf',
    "categorie" TEXT NOT NULL,
    "description" TEXT,
    "date_parution" TIMESTAMP(3) NOT NULL,
    "version" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "texte_juridique_pkey" PRIMARY KEY ("id_texteJuridique")
);

-- CreateTable
CREATE TABLE "offre" (
    "id_offre" TEXT NOT NULL,
    "titre_offre" TEXT NOT NULL,
    "nom_structure" TEXT NOT NULL,
    "type_offre" TEXT NOT NULL,
    "membre_feg" BOOLEAN NOT NULL,
    "contact" TEXT NOT NULL,
    "image_nom" TEXT,
    "image_url" TEXT,
    "bannier_nom" TEXT,
    "bannier_url" TEXT,
    "description" TEXT,
    "email" TEXT NOT NULL,
    "localisation" TEXT NOT NULL,
    "site_web" TEXT NOT NULL,
    "fichier_url" TEXT NOT NULL,
    "fichier_nom" TEXT NOT NULL,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "statut" "StatutOffre" NOT NULL DEFAULT 'INACTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offre_pkey" PRIMARY KEY ("id_offre")
);

-- CreateTable
CREATE TABLE "vente" (
    "id_vente" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_nom" TEXT NOT NULL,
    "taille_image" INTEGER,
    "mime_type" TEXT NOT NULL DEFAULT 'image/jpeg',
    "nom_structure" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vente_pkey" PRIMARY KEY ("id_vente")
);

-- CreateTable
CREATE TABLE "institution_financiere" (
    "id_institution" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "type_institution" TEXT NOT NULL,
    "partenaire_feg" BOOLEAN,
    "description" TEXT,
    "image_url" TEXT,
    "image_nom" TEXT,
    "taille_image" INTEGER,
    "image_mime_type" TEXT DEFAULT 'image/jpeg',
    "adresse" TEXT,
    "contact" TEXT,
    "mail" TEXT,
    "site_web" TEXT,
    "rs_1" TEXT,
    "rs_2" TEXT,
    "service" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institution_financiere_pkey" PRIMARY KEY ("id_institution")
);

-- CreateTable
CREATE TABLE "sea" (
    "id_sea" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "type_sea" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "services" TEXT[],
    "adresse" TEXT,
    "contact" TEXT,
    "mail" TEXT,
    "site_web" TEXT,
    "rs_1" TEXT,
    "rs_2" TEXT,
    "logo_url" TEXT,
    "logo_nom" TEXT,
    "taille_logo" INTEGER,
    "logo_mime_type" TEXT DEFAULT 'image/jpeg',
    "partenaire_feg" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sea_pkey" PRIMARY KEY ("id_sea")
);

-- CreateTable
CREATE TABLE "utilisateur" (
    "id_utilisateur" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "derniere_connexion" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_email_key" ON "utilisateur"("email");
