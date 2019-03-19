const faker = require('faker');
const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('../index');
const db = require('../db');

const endpoint = '/api/signin';

global.console = {
  log: jest.fn(),
};

const clearDB = async () => {
  await db().User.destroy({ where: {} });
  await db().Login.destroy({ where: {} });
};

const generateUser = async user => {
  try {
    const { name, email, password } = user;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    await db().Login.create({ hash, email });
    await db().User.create({ name, email });
  } catch (err) {
    console.log(err.message);
  }
};

const user = {
  name: 'Test',
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('/signin', () => {
  beforeEach(async () => {
    await clearDB();
    await generateUser(user);
  });

  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await clearDB();
  });

  describe('POST', () => {
    it('cannot sign in if the email not corresponds to any existing user', async () => {
      const { password } = user;

      const res = await request(server)
        .post(endpoint)
        .send({
          email: 'test@test.com',
          password,
        })
        .expect(401);

      expect(res.body.error.message).toBe('Invalid Login');
    });

    it('cannot sign in if the password is incorrect', async () => {
      const { email } = user;

      const res = await request(server)
        .post(endpoint)
        .send({
          email,
          password: '123',
        })
        .expect(401);

      expect(res.body.error.message).toBe('Invalid Password');
    });

    it('should sign in a user', async () => {
      const { email, password } = user;

      const res = await request(server)
        .post(endpoint)
        .send({
          email,
          password,
        })
        .expect(200);

      const cookie = res.headers['set-cookie'][0]
        .split(';')
        .map(item => item.split(';')[0])
        .join(';');

      expect(cookie).toContain('token');
      expect(res.body).toHaveProperty('userId');
    });
  });
});
