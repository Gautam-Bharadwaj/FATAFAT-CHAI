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

describe('Cart API integration', () => {
  let userToken;
  let userId;
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
    const hashed = await hashPassword('userpass');
    const user = await User.create({
      email: 'shopper@fatafat.test',
      password: hashed,
      name: 'Shopper',
      role: 'user',
    });
    userId = user._id.toString();
    userToken = signToken({ userId, role: 'user' });
    const product = await Product.create({
      name: 'Cart Test Chai',
      price: 300,
      description: 'For cart',
      image: '/c.png',
      category: 'Classic',
      stock: 15,
    });
    productId = product._id.toString();
  });

  it('POST /api/cart adds item when authenticated', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, quantity: 2 });
    expect(res.status).toBe(201);
    const u = await User.findById(userId);
    expect(u.cartItems.length).toBe(1);
    expect(u.cartItems[0].quantity).toBe(2);
  });

  it('GET /api/cart returns user cart', async () => {
    await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, quantity: 1 });
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(1);
    expect(res.body.items[0].product.name).toBe('Cart Test Chai');
    expect(res.body.subtotal).toBe(300);
  });

  it('DELETE /api/cart/:itemId removes item', async () => {
    await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, quantity: 1 });
    const u = await User.findById(userId);
    const itemId = u.cartItems[0]._id.toString();
    const res = await request(app)
      .delete(`/api/cart/${itemId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    const after = await User.findById(userId);
    expect(after.cartItems.length).toBe(0);
  });
});
