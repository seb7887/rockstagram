const app = require('../app');
const request = require('supertest');

describe('Server Dummy Test', () => {
  it('yep!', async () => {
    const res = await request(app)
      .get('/')
      .expect(200);

    expect(res.body).toContain('Hello World!');
  });
});
