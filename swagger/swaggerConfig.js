// swagger/swaggerConfig.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API Next.js',
      version: '1.0.0',
      description: 'Documentation de l’API REST avec Swagger',
    },
    servers: [
      {
<<<<<<< HEAD
        url: 'http://localhost:3000',
=======
        url: 'http://localhost:3000/',
>>>>>>> ca687bc6cae8675ba519c94827d425bac366f6ea
      },
    ],
  },
  apis: [
    'app/api/**/*.ts',      // Toutes tes routes API Next.js
    './swagger/**/*.ts',    // Ton fichier de documentation centralisée
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
