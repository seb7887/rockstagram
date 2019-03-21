const faker = require('faker');
const request = require('supertest');
const { registerUser, createPost } = require('../utils/testUtils');

const server = require('../index');
const db = require('../db');

const endpoint = '/api/posts';

global.console = {
  log: jest.fn(),
};

const clearDB = async () => {
  await db().User.destroy({ where: {} });
  await db().Login.destroy({ where: {} });
  await db().Photo.destroy({ where: {} });
};

const user = {
  name: 'Test',
  email: faker.internet.email(),
  password: '1234',
};

const fakeUser = {
  name: 'Fake',
  email: faker.internet.email(),
  password: '4321',
};

const photo = {
  imageUrl: 'photo.png',
  caption: 'Fnord!',
};

const anotherPhoto = {
  imageUrl: faker.image.avatar(),
  caption: 'Some text',
};

describe('/posts', () => {
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

    beforeEach(async () => {
      const res = await registerUser(user);
      id = res.id;
      token = res.token;
    });

    it('cannot create a post if user is not authenticated', async () => {
      const res = await request(server)
        .post(endpoint)
        .send(photo)
        .expect(401);

      expect(res.text).toBe('Unauthorized');
    });

    it('should create a post', async () => {
      const res = await request(server)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send(photo)
        .expect(200);

      expect(res.body.post.imageUrl).toBe(photo.imageUrl);
      expect(res.body.post.caption).toBe(photo.caption);
    });
  });

  describe('GET ?user=:id', () => {
    let id;
    let token;

    beforeEach(async () => {
      const res = await registerUser(user);
      id = res.id;
      token = res.token;
      await createPost(token, photo);
    });

    it(`should get user's posts`, async () => {
      const res = await request(server)
        .get(`${endpoint}?user=${id}`)
        .expect(200);

      expect(res.body.posts).toHaveLength(1);
    });
  });

  describe('GET /:id', () => {
    let token;
    let id;

    beforeEach(async () => {
      const res = await registerUser(user);
      token = res.token;
      const post = await createPost(token, photo);
      id = post.id;
    });

    it('cannot get an unexistent post', async () => {
      const res = await request(server)
        .get(`${endpoint}/345`)
        .expect(404);

      expect(res.body.error.message).toBe('Post not found');
    });

    it('should get a post', async () => {
      const res = await request(server)
        .get(`${endpoint}/${id}`)
        .expect(200);

      expect(res.body.post.imageUrl).toBe(photo.imageUrl);
      expect(res.body.post.caption).toBe(photo.caption);
    });
  });

  describe('PUT /:id', () => {
    let token;
    let postId;

    beforeEach(async () => {
      const res = await registerUser(user);
      token = res.token;
      const post = await createPost(token, photo);
      postId = post.id;
    });

    it('cannot edit a post if user is not the owner', async () => {
      const anotherUser = await registerUser(fakeUser);
      const anotherToken = anotherUser.token;

      const res = await request(server)
        .put(`${endpoint}/${postId}`)
        .set('Authorization', `Bearer ${anotherToken}`)
        .expect(403);

      expect(res.body.error.message).toBe('Forbidden');
    });

    it('cannot edit an unexistent post', async () => {
      const res = await request(server)
        .put(`${endpoint}/345`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(res.body.error.message).toBe('Cannot find post');
    });

    it('should edit a post', async () => {
      let edit = {
        caption: 'Hey!',
      };

      const res = await request(server)
        .put(`${endpoint}/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(edit)
        .expect(200);

      expect(res.body.message).toBe('Post updated!');
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let postId;

    beforeEach(async () => {
      const res = await registerUser(user);
      token = res.token;
      const post = await createPost(token, photo);
      postId = post.id;
    });

    it('cannot edit a post if user is not the owner', async () => {
      const anotherUser = await registerUser(fakeUser);
      const anotherToken = anotherUser.token;

      const res = await request(server)
        .delete(`${endpoint}/${postId}`)
        .set('Authorization', `Bearer ${anotherToken}`)
        .expect(403);

      expect(res.body.error.message).toBe('Forbidden');
    });

    it('cannot edit an unexistent post', async () => {
      const res = await request(server)
        .delete(`${endpoint}/345`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(res.body.error.message).toBe('Cannot find post');
    });

    it('should edit a post', async () => {
      let edit = {
        caption: 'Hey!',
      };

      const res = await request(server)
        .delete(`${endpoint}/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(edit)
        .expect(200);

      expect(res.body.message).toBe('Post deleted');
    });
  });
});
