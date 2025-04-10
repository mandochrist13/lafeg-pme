import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";


// Lecture par id (GET)
// (GET) http://localhost:3000/api/sea/id

const prisma = new PrismaClient

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
      return NextResponse.json({ error: 'SEA introuvable' }, { status: 404 })
    }
    // Si l'élément est trouvé, retournez-le avec un code de statut 200
    return NextResponse.json(sea, { status: 200 })

  } catch (error) {

    // En cas d'erreur serveur, retournez un message d'erreur 500
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
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

    // Vérifie si l'entrée existe
    const existingSea = await prisma.sEA.findUnique({
      where: { id_sea: id },
    });

    if (!existingSea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }

    // Supprime l'entrée
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();

    // Vérifie que la SEA existe
    const existingSea = await prisma.sEA.findUnique({
      where: { id_sea: id },
    });

    if (!existingSea) {
      return NextResponse.json({ error: "SEA introuvable" }, { status: 404 });
    }

    // Met à jour les champs
    const updatedSea = await prisma.sEA.update({
      where: { id_sea: id },
      data: {
        nom: data.nom,
        description: data.description || "",
        type_sea: data.type_sea,
        categorie: data.categorie,
        services: data.services || [],
        adresse: data.adresse || "",
        contact: data.contact || null,
        mail: data.mail || null,
        site_web: data.site_web || null,
        rs_1: data.rs_1 || null,
        rs_2: data.rs_2 || null,
        logo: data.logo || null,
        partenaire_feg: data.partenaire_feg ?? false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedSea, { status: 200 });
  } catch (error) {
    console.error("Erreur PUT :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
