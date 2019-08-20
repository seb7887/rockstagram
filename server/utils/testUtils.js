const request = require('supertest');

const server = require('../index');

const usersEndpoint = '/api/users';
const postsEndpoint = '/api/posts';

const registerUser = async user => {
  const res = await request(server)
    .post(usersEndpoint)
    .send(user)
    .expect(200);

  const cookie = res.headers['set-cookie'][0]
    .split(';')
    .map(item => item.split(';')[0])
    .join(';');

  expect(cookie).toContain('token');
  expect(res.body).toHaveProperty('userId');

  const id = res.body.userId;
  const token = cookie.split(';')[0].split('=')[1];

  return { id, token };
};

const createPost = async (token, post) => {
  const res = await request(server)
    .post(postsEndpoint)
    .set('Authorization', `Bearer ${token}`)
    .send(post)
    .expect(200);

  return res.body.post;
};

module.exports = {
  registerUser,
  createPost,
};
