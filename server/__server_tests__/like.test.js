const faker = require('faker');
const request = require('supertest');
const { registerUser, createPost } = require('../utils/testUtils');

const server = require('../index');
const db = require('../db');

const endpoint = '/api/like';

const me = {
  name: 'Test',
  email: faker.internet.email(),
  password: '1234',
};

const post = {
  imageUrl: 'post.png',
  caption: 'Fnord!',
};

global.console = {
  log: jest.fn(),
};

const clearDB = async () => {
  await db().User.destroy({ where: {} });
  await db().Login.destroy({ where: {} });
  await db().Like.destroy({ where: {} });
  await db().Photo.destroy({ where: {} });
};

describe('/like', () => {
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
    let token;
    let postId;

    beforeEach(async () => {
      const user = await registerUser(me);
      token = user.token;
      const photo = await createPost(token, post);
      postId = photo.id;
    });

    it('cannot like an unexistent post', async () => {
      const res = await request(server)
        .post(`${endpoint}?post=123`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(res.body.error.message).toBe('Unexistent Post');
    });

    it('should like a post', async () => {
      const res = await request(server)
        .post(`${endpoint}?post=${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.message).toBe('Like!');
    });
  });

  describe('DELETE', () => {
    let token;
    let userId;
    let postId;

    beforeEach(async () => {
      const user = await registerUser(me);
      token = user.token;
      userId = user.id;
      const photo = await createPost(token, post);
      postId = photo.id;
    });

    it('cannot unlike an unexistent post', async () => {
      const res = await request(server)
        .delete(`${endpoint}?post=123`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(res.body.error.message).toBe('Unexistent Post');
    });

    it('should unlike a post', async () => {
      await db().Like.create({ UserId: userId, PhotoId: postId });

      const res = await request(server)
        .delete(`${endpoint}?post=${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.message).toBe('Unlike!');
    });
  });
});
