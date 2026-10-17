import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LAFEG PME',
      version: '1.0.0',
      description: "Documentation de l'API REST",
    },
    servers: [
      {
        // L'URL de production venait d'un placeholder (« votre-domaine.com ») :
        // on utilise maintenant l'URL réelle du site.
        url:
          process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
              'https://guide-numerique.lafeg.ga'
            : 'http://localhost:3000',
        description:
          process.env.NODE_ENV === 'production'
            ? 'Serveur de production'
            : 'Serveur de développement',
      },
    ],
  },
  tags: [
  {
    name: 'Institutions',
    description: 'Opérations liées aux institutions financières'
  },
    {
    name: 'SEA',
    description: 'Opérations liées aux SEA'
  },
  {
    name: 'Publicités',
    description: 'Opérations liées aux publicités'
  },
  {
    name: 'Offres',
    description: 'Opérations liées aux offres d\'emploi'
  },
  {
    name: 'Textes Juridiques',
    description: 'Opérations liées aux textes juridiques'
  },


],
  // Les chemins vers les fichiers contenant vos routes API
  apis: ['./app/api/**/*.ts', './app/api/**/*.js','./lib/swagger-schemas.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;