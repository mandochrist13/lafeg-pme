// app/api/sea/data.ts


// Données fictives simulant des entrées dans la base de données

export const testSeaList = [
    {
      id_sea: '1',
      nom: 'Ogooué Labs',
      description: 'Incubateur numérique au Gabon',
      type_sea: 'Entreprise',
      categorie: 'Technologie',
      services: ['Incubation', 'Coworking'],
      adresse: 'Libreville, Gabon',
      contact: '+241 01 23 45 67',
      mail: 'contact@ogoueelabs.ga',
      site_web: 'https://ogoueelabs.ga',
      rs_1: 'https://facebook.com/ogoueelabs',
      rs_2: 'https://twitter.com/ogoueelabs',
      logo: 'https://ogoueelabs.ga/logo.png',
      partenaire_feg: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_sea: '2',
      nom: 'Green Gabon',
      description: 'Association pour la reforestation',
      type_sea: 'Association',
      categorie: 'Environnement',
      services: ['Sensibilisation', 'Reboisement'],
      adresse: 'Port-Gentil',
      contact: null,
      mail: 'green@gabon.org',
      site_web: null,
      rs_1: 'https://instagram.com/greengabon',
      rs_2: null,
      logo: null,
      partenaire_feg: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  