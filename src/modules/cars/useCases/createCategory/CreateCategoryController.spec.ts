import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
     values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'HFM-0112')
    `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // Deve ser possível criar uma nova categoria
  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Supertest Category Name',
        description: 'Supertest Category Description',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  // Não deve ser possível criar uma nova categoria com o nome existente
  it('not should be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Supertest Category Name',
        description: 'Supertest Category Description',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});
