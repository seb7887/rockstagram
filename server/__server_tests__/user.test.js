const faker = require('faker');
const request = require('supertest');
const { registerUser } = require('../utils/testUtils');

const server = require('../index');
const db = require('../db');

const endpoint = '/api/users';

global.console = {
  log: jest.fn(),
};

const clearDB = async () => {
  await db().User.destroy({ where: {} });
  await db().Login.destroy({ where: {} });
};

const generateUser = async user => {
  const { name, email } = user;
  const { id } = await db().User.create({ name, email });
  return id;
};

const user = {
  name: 'Test',
  email: faker.internet.email(),
  password: '1234',
};

const updatedUser = {
  name: 'Testing',
  email: faker.internet.email(),
  bio: 'bla bla bla',
  profilePic: faker.image.people(),
};

describe('/users', () => {
  beforeEach(async () => {
    await clearDB();
  });

  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await clearDB();
  });

  describe('POST', () => {
    it('cannot create a user if name contains less than 2 characters', async () => {
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

    it('cannot create a user if email is not valid', async () => {
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

    it('cannot create a user if password contains less than 4 characters', async () => {
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

    it('should create a user', async () => {
      const res = await request(server)
        .post(endpoint)
        .send(user)
        .expect(200);

      const cookie = res.headers['set-cookie'][0]
        .split(';')
        .map(item => item.split(';')[0])
        .join(';');

      expect(cookie).toContain('token');
      expect(res.body).toHaveProperty('userId');
    });
  });

  describe('GET /:id', () => {
    it('cannot get an unexistent user', async () => {
      const res = await request(server)
        .get(`${endpoint}/123`)
        .expect(400);

      expect(res.body.error.message).toBe('Cannot find user');
    });

    it('should get a user', async () => {
      const id = await generateUser(user);
      const res = await request(server)
        .get(`${endpoint}/${id}`)
        .expect(200);

      expect(res.body.user.name).toBe(user.name);
      expect(res.body.user.email).toBe(user.email);
    });
  });

  describe('PUT /:id', () => {
    let id;
    let token;

    beforeEach(async () => {
      const res = await registerUser(user);
      id = res.id;
      token = res.token;
    });

    it('cannot update a user if authorization header is not present', async () => {
      const res = await request(server)
        .put(`${endpoint}/123`)
        .expect(401);

      expect(res.text).toBe('Unauthorized');
    });

    it('cannot update an unexistent user', async () => {
      const res = await request(server)
        .put(`${endpoint}/123`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .expect(400);

      expect(res.body.error.message).toBe('Cannot find user');
    });

    it('should update a user', async () => {
      const res = await request(server)
        .put(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .expect(200);

      expect(res.body.message).toBe('User Updated!');
    });
  });

  describe('DELETE /:id', () => {
    let id;
    let token;

    beforeEach(async () => {
      const res = await registerUser(user);
      id = res.id;
      token = res.token;
    });

    it('cannot delete a user if authorization header is not present', async () => {
      const res = await request(server)
        .delete(`${endpoint}/123`)
        .expect(401);

      expect(res.text).toBe('Unauthorized');
    });

    it('cannot delete an unexistent user', async () => {
      const res = await request(server)
        .delete(`${endpoint}/123`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(res.body.error.message).toBe('Cannot find user');
    });

    it('should delete a user', async () => {
      const res = await request(server)
        .delete(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.message).toBe('Account deleted');
    });
  });
});
