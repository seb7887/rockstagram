const faker = require('faker');
const request = require('supertest');
const { registerUser } = require('../utils/testUtils');

const server = require('../index');
const db = require('../db');

const endpoint = '/api/follow';

const following = {
  name: 'Following',
  email: faker.internet.email(),
  password: '1234',
};

const follower = {
  name: 'Follower',
  email: faker.internet.email(),
  password: '4321',
};

global.console = {
  log: jest.fn(),
};

const clearDB = async () => {
  await db().User.destroy({ where: {} });
  await db().Login.destroy({ where: {} });
  await db().Follow.destroy({ where: {} });
};

describe('/follow', () => {
  beforeEach(async () => {
    await clearDB();
  });

  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await clearDB();
  });

  describe('POST /:id', () => {
    let id;
    let token;

    beforeEach(async () => {
      let user = await registerUser(following);
      id = user.id;
      user = await registerUser(follower);
      token = user.token;
    });

    it('cannot follow an unexistent user', async () => {
      const res = await request(server)
        .post(`${endpoint}/345`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(res.body.error.message).toBe('Unexistent User');
    });

    it('should follow a user', async () => {
      const res = await request(server)
        .post(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.message).toBe('Following');
    });
  });

  describe('DELETE /:id', () => {
    let followingId;
    let followerId;
    let token;

    beforeEach(async () => {
      let user = await registerUser(following);
      followingId = user.id;
      user = await registerUser(follower);
      followerId = user.id;
      token = user.token;
      await db().Follow.create({ followingId, followerId });
    });

    it('cannot unfollow an unexistent user', async () => {
      const res = await request(server)
        .delete(`${endpoint}/345`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(res.body.error.message).toBe('Unexistent User');
    });

    it('should unfollow a user', async () => {
      const res = await request(server)
        .delete(`${endpoint}/${followingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.message).toBe('Unfollowing');
    });
  });
});
