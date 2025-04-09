import { NextResponse } from "next/server";
import { testSeaList } from "../data";

// Lecture par id (GET)
// (GET) http://localhost:3000/api/sea/id

export async function GET(request: Request,
    { params }: { params: { id: string } }) {


    try {

        const id = params.id

        const sea = testSeaList.find(item => item.id_sea === id)

        if (!sea) {
            return NextResponse.json({ error: 'SEA introuvable' }, { status: 404 })
        }

        return NextResponse.json(sea, { status: 200 })
    } catch (error) {
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
  
      // Recherche l'index de l'objet à modifier
      const seaIndex = testSeaList.findIndex((item) => item.id_sea === id);
  
      // Vérifie si l'objet n'existe pas : findIndex renvoie -1 s'il n'est pas trouvé
      if (seaIndex === -1) {
        return NextResponse.json({ error: 'SEA introuvable' }, { status: 404 });
      }
  
      // Mise à jour partielle des données
      testSeaList[seaIndex] = {
        ...testSeaList[seaIndex],
        ...data,
        updatedAt: new Date(), // Mise à jour de la date de modification
      };
  
      return NextResponse.json(testSeaList[seaIndex], { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour' },
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
      const id = params.id
  
      const indexToDelete = testSeaList.findIndex(item => item.id_sea === id)
  
      if (indexToDelete === -1) {
        return NextResponse.json({ error: 'SEA introuvable' }, { status: 404 })
      }
  
      const deletedSea = testSeaList.splice(indexToDelete, 1)
  
      return NextResponse.json(deletedSea, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
  }