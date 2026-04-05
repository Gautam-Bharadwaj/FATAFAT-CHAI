const request = require('supertest');
const app = require('../../src/app');
const User = require('../../models/User');
const { hashPassword } = require('../../utils/authUtils');
const {
  connectTestDb,
  disconnectTestDb,
  clearCollections,
} = require('./setupIntegration');

describe('Auth API integration', () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  afterAll(async () => {
    await disconnectTestDb();
  });

  afterEach(async () => {
    await clearCollections();
  });

  it('POST /api/auth/register creates new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'new@fatafat.test',
      password: 'secret123',
      name: 'New User',
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('new@fatafat.test');
    const u = await User.findOne({ email: 'new@fatafat.test' });
    expect(u).not.toBeNull();
  });

  it('POST /api/auth/login returns JWT token', async () => {
    const hashed = await hashPassword('mypassword');
    await User.create({
      email: 'login@fatafat.test',
      password: hashed,
      name: 'Login User',
      role: 'user',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@fatafat.test',
      password: 'mypassword',
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('login@fatafat.test');
  });

  it('POST /api/auth/login with wrong password returns 401', async () => {
    const hashed = await hashPassword('right');
    await User.create({
      email: 'secure@fatafat.test',
      password: hashed,
      role: 'user',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'secure@fatafat.test',
      password: 'wrong',
    });
    expect(res.status).toBe(401);
  });
});
