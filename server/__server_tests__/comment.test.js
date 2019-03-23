const faker = require('faker');
const request = require('supertest');
const { registerUser, createPost } = require('../utils/testUtils');

const server = require('../index');
const db = require('../db');

const endpoint = '/api/comments';

const me = {
  name: 'Test',
  email: faker.internet.email(),
  password: '1234',
};

const post = {
  imageUrl: 'post.png',
  caption: 'Fnord!',
};

const comment = {
  commentText: 'Hey!',
};

global.console = {
  log: jest.fn(),
};

const clearDB = async () => {
  await db().User.destroy({ where: {} });
  await db().Login.destroy({ where: {} });
  await db().Comment.destroy({ where: {} });
  await db().Photo.destroy({ where: {} });
};

describe('/comments', () => {
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

    it('cannot create a comment in an unexistent post', async () => {
      const res = await request(server)
        .post(`${endpoint}?post=123`)
        .set('Authorization', `Bearer ${token}`)
        .send(comment)
        .expect(400);

      expect(res.body.error.message).toBe('Unexistent post');
    });

    it('should create a comment', async () => {
      const res = await request(server)
        .post(`${endpoint}?post=${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(comment)
        .expect(200);

      expect(res.body.comment.commentText).toBe(comment.commentText);
      expect(res.body.post.comments).toBe(1);
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let commentId;
    let postId;

    beforeEach(async () => {
      const user = await registerUser(me);
      token = user.token;
      const photo = await createPost(token, post);
      postId = photo.id;
      const myComment = await db().Comment.create({
        commentText: comment.commentText,
        PhotoId: postId,
      });
      commentId = myComment.id;
    });

    it('cannot delete an unexistent comment', async () => {
      const res = await request(server)
        .delete(`${endpoint}/123?post=${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(res.body.error.message).toBe('Unexistent comment');
    });

    it('should delete a comment', async () => {
      const res = await request(server)
        .delete(`${endpoint}/${commentId}?post=${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.message).toBe('Comment deleted');
    });
  });
});
