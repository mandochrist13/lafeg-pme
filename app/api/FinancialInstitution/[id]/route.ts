import { NextRequest, NextResponse } from 'next/server';
import { institutionsFinanciere } from '../data/data';




// Fonction qui s'exécute quand une requête PUT est envoyée à /api/institutions/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) { 
  try {
     // On extrait l'ID depuis les paramètres de l'URL, et on le convertit en nombre
    const institutionId = parseInt(params.id); 

    // Si l'ID fourni n'est pas un nombre (NaN), on retourne une erreur 400
    if (isNaN(institutionId)) {
      return NextResponse.json({ error: 'ID invalide.' }, { status: 400 });
    }

    // On récupère le corps de la requête (les données que le client veut mettre à jour)
    const body = await request.json(); 

    // On cherche l'index de l'institution qui a cet ID
    const index = institutionsFinanciere.findIndex(inst => inst.id === institutionId);

     // Si aucune institution avec cet ID n'existe, on retourne une erreur 404
    if (index === -1) {
      return NextResponse.json({ error: 'Institution non trouvée.' }, { status: 404 });
    }

    // Fusionne les anciens champs avec les nouveaux, et met à jour la date de modification
    institutionsFinanciere[index] = {
      ...institutionsFinanciere[index], // On garde tous les anciens champs
      ...body, // On remplace avec les champs mis à jour
      updateAt: new Date().toISOString(), // On met à jour la date de modification
    };

    // Retourne l'objet mis à jour avec un code 200 (succès)
    return NextResponse.json(institutionsFinanciere[index], { status: 200 });
  } catch (error) {
    // En cas d'erreur inattendue (ex: problème JSON, crash), on log l'erreur et renvoie un code 500
    console.error('Erreur PUT /api/institutions/[id]:', error);
    return NextResponse.json({ error: 'Erreur Interne du Serveur' }, { status: 500 });
  }
}


// Supprimer une institution financière
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      // On extrait l'ID depuis les paramètres de l'URL, et on le convertit en nombre
      const institutionId = parseInt(params.id); 
  
      // Si l'ID fourni n'est pas un nombre (NaN), on retourne une erreur 400
      if (isNaN(institutionId)) {
        return NextResponse.json({ error: 'ID invalide.' }, { status: 400 });
      }
  
      // On cherche l'index de l'institution à supprimer
      const index = institutionsFinanciere.findIndex(inst => inst.id === institutionId);
  
      // Si aucune institution avec cet ID n'existe, on retourne une erreur 404
      if (index === -1) {
        return NextResponse.json({ error: 'Institution non trouvée.' }, { status: 404 });
      }
  
      // On supprime l'institution de la liste
      institutionsFinanciere.splice(index, 1);
  
      // Retourne un message de succès après la suppression
      return NextResponse.json({ message: 'Institution supprimée avec succès.' }, { status: 200 });
    } catch (error) {
      // En cas d'erreur inattendue (ex: problème JSON, crash), on log l'erreur et renvoie un code 500
      console.error('Erreur DELETE /api/institutions/[id]:', error);
      return NextResponse.json({ error: 'Erreur Interne du Serveur' }, { status: 500 });
    }
  }
  