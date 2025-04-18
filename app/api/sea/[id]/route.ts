import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
}

// Lecture par id (GET)
// (GET) http://localhost:3000/api/sea/id

export async function GET(request: Request,
  { params }: { params: { id: string } }) {

  try {

    const id = params.id

    // Recherche de l'élément par ID dans la base de données MongoDB via Prisma
    const sea = await prisma.sEA.findUnique({
      where: {
        id_sea: id,
      },
    });

    // Si l'élément n'est pas trouvé, retournez une erreur 404
    if (!sea) {
      const response = NextResponse.json({ error: 'SEA introuvable' }, { status: 404 });
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }
    // Si l'élément est trouvé, retournez-le avec un code de statut 200
    const response = NextResponse.json(sea, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;

  } catch (error) {

    // En cas d'erreur serveur, retournez un message d'erreur 500
    const response = NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  }
  
}



// Modification partielle (PATCH)
// (PATCH) http://localhost:3000/api/sea/[id]


export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();

    // Vérifie si l'entrée SEA existe dans la DB
    const existingSea = await prisma.sEA.findUnique({
      where: { id_sea: id },
    });

    if (!existingSea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }

    // Mise à jour partielle
    const updatedSea = await prisma.sEA.update({
      where: { id_sea: id },
      data: {
        ...data,
        updatedAt: new Date(), // Mettre à jour la date de modif
      },
    });

    return NextResponse.json(updatedSea, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}



// Suppression (DELETE)
// (DELETE) http://localhost:3000/api/sea/id

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Récupérer la SEA pour avoir le nom du fichier logo
    const existingSea = await prisma.sEA.findUnique({
      where: { id_sea: id },
    });

    if (!existingSea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }

    // Supprimer le logo de Supabase Storage s'il existe
    if (existingSea.logo_nom) {
      const { error: deleteError } = await supabase.storage
        .from('feg')
        .remove([`sea/${existingSea.logo_nom}`]);

      if (deleteError) {
        console.error('Erreur lors de la suppression du logo:', deleteError);
      }
    }

    // Supprimer l'entrée de la base de données
    const deletedSea = await prisma.sEA.delete({
      where: { id_sea: id },
    });

    return NextResponse.json(deletedSea, { status: 200 });
  } catch (error) {
    console.error("Erreur DELETE :", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}

// Suppression (PUT)
// (PUT) http://localhost:3000/api/sea/id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Vérifier que la SEA existe
    const existingSea = await prisma.sEA.findUnique({
      where: { id_sea: id },
    });

    if (!existingSea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const updates: any = {};

    // Mise à jour des champs texte
    const textFields = ['nom', 'description', 'type_sea', 'categorie', 'adresse', 'contact', 'mail', 'site_web', 'rs_1', 'rs_2'];
    for (const field of textFields) {
      const value = formData.get(field);
      if (value !== null) {
        updates[field] = value as string;
      }
    }

    // Traitement des services (tableau)
    const servicesStr = formData.get('services');
    if (servicesStr) {
      updates.services = JSON.parse(servicesStr as string);
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
      if (existingSea.logo_nom) {
        const { error: deleteError } = await supabase.storage
          .from('feg')
          .remove([`sea/${existingSea.logo_nom}`]);

        if (deleteError) {
          console.error('Erreur lors de la suppression de l\'ancien logo:', deleteError);
        }
      }

      // Upload du nouveau logo
      const timestamp = Date.now();
      const fileName = `${timestamp}-${logo.name.replace(/\s+/g, '-')}`;
      const filePath = `sea/${fileName}`;

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

    // Ajout de la date de mise à jour
    updates.updatedAt = new Date();

    // Mise à jour en base de données
    const updatedSea = await prisma.sEA.update({
      where: { id_sea: id },
      data: updates,
    });

    return NextResponse.json(updatedSea);
  } catch (error) {
    console.error("Erreur PUT :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
