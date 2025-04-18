// swagger-server.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(4000, () => {
  console.log('Swagger Docs dispo sur http://localhost:4000/api-docs');
});
