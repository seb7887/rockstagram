const faker = require('faker');
const request = require('supertest');
const { registerUser, createPost } = require('../utils/testUtils');

const server = require('../index');
const db = require('../db');

const endpoint = '/api/feed';

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

const anotherFollowing = {
  name: 'Another',
  email: faker.internet.email(),
  password: '4321',
};

const followerPost = {
  imageUrl: 'follower.png',
  caption: 'Fnord!',
};

const followingPost = {
  imageUrl: 'following.png',
  caption: 'Fnord!',
};

global.console = {
  log: jest.fn(),
};

const clearDB = async () => {
  await db().User.destroy({ where: {} });
  await db().Login.destroy({ where: {} });
  await db().Follow.destroy({ where: {} });
  await db().Photo.destroy({ where: {} });
};

describe('/feed', () => {
  beforeEach(async () => {
    await clearDB();
  });

  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await clearDB();
  });

  describe('GET /posts', () => {
    let token;
    let followerId;
    let followingId;

    beforeEach(async () => {
      let user = await registerUser(following);
      followingId = user.id;
      token = user.token;
      await createPost(token, followingPost);
      user = await registerUser(follower);
      followerId = user.id;
      token = user.token;
      await createPost(token, followerPost);
    });

    it('should get only user posts if there are not following users', async () => {
      const res = await request(server)
        .get(`${endpoint}/posts`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.posts).toHaveLength(1);
    });

    it('should get posts feed', async () => {
      await db().Follow.create({ followingId, followerId });

      const res = await request(server)
        .get(`${endpoint}/posts`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.posts).toHaveLength(2);
    });
  });

  describe('GET /users', () => {
    let token;
    let followerId;
    let followingId;
    let anotherId;

    beforeEach(async () => {
      let user = await registerUser(following);
      followingId = user.id;
      user = await registerUser(anotherFollowing);
      anotherId = user.id;
      user = await registerUser(follower);
      followerId = user.id;
      token = user.token;
    });

    it('should get all remaining users if the user is following nobody', async () => {
      const res = await request(server)
        .get(`${endpoint}/users`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.users).toHaveLength(2);
    });

    it('should get no users is the user is following everybody', async () => {
      await db().Follow.create({ followingId, followerId });
      await db().Follow.create({ anotherFollowing, followerId });

      const res = await request(server)
        .get(`${endpoint}/users`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.users).toHaveLength(0);
    });

    it('should get users feed', async () => {
      await db().Follow.create({ followingId, followerId });

      const res = await request(server)
        .get(`${endpoint}/users`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.users).toHaveLength(1);
    });
  });
});
