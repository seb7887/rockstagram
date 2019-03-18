const faker = require('faker');
const request = require('supertest');

const app = require('../app');

const endpoint = '/api/users';

describe('/users', () => {
  describe('POST', () => {
    it('cannot create an user if name contains less than 2 characters', async () => {
      const res = await request(app)
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
      const res = await request(app)
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
      const res = await request(app)
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
  });
});
