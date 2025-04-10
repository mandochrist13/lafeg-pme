// pages/api/docs.ts
import { NextApiRequest, NextApiResponse } from 'next';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../../swagger/swaggerConfig';
import express from 'express';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const app = express();
  app.use('api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app(req, res); // Adapt Express à Next
};

export default handler;
