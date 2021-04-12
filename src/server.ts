import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import './database';
import './shared/container';

import { ServerError } from './errors/ServerError';
import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(ServerError);

app.listen(3333, () => {
  console.log('🚀 Server running on port 3333');
});
