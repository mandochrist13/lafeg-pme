// swagger/swaggerConfig.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API LAFEG PME',
      version: '1.0.0',
      description: 'Documentation de l\'API REST de la plateforme LAFEG PME',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    tags: [
      {
        name: 'Textes Juridiques',
        description: 'Gestion des textes juridiques'
      },
      {
        name: 'Institutions Financières',
        description: 'Gestion des institutions financières'
      },
      {
        name: 'Structures d\'Accompagnement',
        description: 'Gestion des structures d\'accompagnement (SEA)'
      }
    ]
  },
  apis: [
    'app/api/**/*.ts',
    'swagger/*.docs.ts'
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
