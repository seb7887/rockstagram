const faker = require('faker');
const request = require('supertest');

const server = require('../index');
const db = require('../db');

const endpoint = '/api/users';

global.console = {
  log: jest.fn(),
};

describe('/users', () => {
  beforeEach(async () => {
    await db().User.destroy({ where: {} });
  });

  afterEach(async () => {
    await server.close();
  });

  describe('POST', () => {
    it('cannot create an user if name contains less than 2 characters', async () => {
      const res = await request(server)
        .post(endpoint)
        .send({
          name: 's',
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .expect(400);

      expect(res.body.error.message).toBe(
        'Name must be between 2 and 22 characters',
      );
    });

    it('cannot create an user if email is not valid', async () => {
      const res = await request(server)
        .post(endpoint)
        .send({
          name: 'Test',
          email: 'test@test',
          password: faker.internet.password(),
        })
        .expect(400);

      expect(res.body.error.message).toBe('Invalid Email');
    });

    it('cannot create an user if password contains less than 4 characters', async () => {
      const res = await request(server)
        .post(endpoint)
        .send({
          name: 'Test',
          email: faker.internet.email(),
          password: '123',
        })
        .expect(400);

      expect(res.body.error.message).toBe(
        'Password must be between 4 and 12 characters',
      );
    });

    it('should create an user', async () => {
      const user = {
        name: 'Test',
        email: faker.internet.email(),
        password: '1234',
      };

      const res = await request(server)
        .post(endpoint)
        .send(user)
        .expect(201);

      expect(res.body.name).toBe(user.name);
      expect(res.body.email).toBe(user.email.toLowerCase());
    });
  });
});
