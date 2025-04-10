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
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['app/api/**/*.ts', 'app/api/**/*.js'],

};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
