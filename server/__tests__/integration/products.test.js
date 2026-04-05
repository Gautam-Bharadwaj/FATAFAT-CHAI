const request = require('supertest');
const app = require('../../src/app');
const User = require('../../models/User');
const Product = require('../../models/Product');
const { hashPassword, signToken } = require('../../utils/authUtils');
const {
  connectTestDb,
  disconnectTestDb,
  clearCollections,
} = require('./setupIntegration');

describe('Products API integration', () => {
  let adminToken;
  let productId;

  beforeAll(async () => {
    await connectTestDb();
  });

  afterAll(async () => {
    await disconnectTestDb();
  });

  afterEach(async () => {
    await clearCollections();
  });

  beforeEach(async () => {
    const hashed = await hashPassword('adminpass');
    const admin = await User.create({
      email: 'admin@fatafat.test',
      password: hashed,
      name: 'Admin',
      role: 'admin',
    });
    adminToken = signToken({ userId: admin._id.toString(), role: 'admin' });
    const p = await Product.create({
      name: 'Test Masala',
      price: 450,
      description: 'Spicy',
      image: '/t.png',
      category: 'Classic',
      stock: 20,
    });
    productId = p._id.toString();
  });

  it('GET /api/products returns array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Test Masala');
  });

  it('GET /api/products/:id returns single product', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(productId);
    expect(res.body.price).toBe(450);
  });

  it('POST /api/products creates product with admin auth', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'New Blend',
        price: 500,
        description: 'Fresh',
        image: '/n.png',
        category: 'Premium',
        stock: 5,
      });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('New Blend');
    const count = await Product.countDocuments();
    expect(count).toBe(2);
  });

  it('DELETE /api/products/:id deletes product with admin auth', async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
    const found = await Product.findById(productId);
    expect(found).toBeNull();
  });
});
