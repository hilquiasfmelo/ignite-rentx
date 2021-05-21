import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import '@shared/container';

import { ServerError } from '@shared/errors/ServerError';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../../swagger.json';
import { router } from '../routes';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(ServerError);

export { app };
