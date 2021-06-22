import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import '@shared/container';

import upload from '@config/upload';
import { ServerError } from '@shared/errors/ServerError';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../../swagger.json';
import { router } from '../routes';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(ServerError);

export { app };
