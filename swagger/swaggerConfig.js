// swagger/swaggerConfig.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Next.js API',
      version: '1.0.0',
      description: 'Documentation de l’API REST avec Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['app/api/**/*.ts', 'app/api/**/*.js'],

};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
