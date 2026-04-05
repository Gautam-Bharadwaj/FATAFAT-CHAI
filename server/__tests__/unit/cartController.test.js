jest.mock('../../models/User');
jest.mock('../../models/Product');

const mongoose = require('mongoose');
const User = require('../../models/User');
const Product = require('../../models/Product');
const {
  getCart,
  addToCart,
  removeFromCart,
} = require('../../controllers/cartController');

describe('cartController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { user: { id: 'user1' }, params: {}, body: {} };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('getCart', () => {
    it('returns cart with items and subtotal', async () => {
      const productId = new mongoose.Types.ObjectId();
      const lineId = new mongoose.Types.ObjectId();
      const userDoc = {
        cartItems: [
          {
            _id: lineId,
            product: { _id: productId, name: 'Masala', price: 100 },
            quantity: 2,
          },
        ],
      };
      User.findById = jest.fn().mockReturnValue({
        populate: jest
          .fn()
          .mockReturnValue({ lean: jest.fn().mockResolvedValue(userDoc) }),
      });

      await getCart(req, res);

      expect(res.json).toHaveBeenCalledWith({
        items: [
          expect.objectContaining({
            itemId: lineId.toString(),
            quantity: 2,
            lineTotal: 200,
          }),
        ],
        subtotal: 200,
      });
    });
  });

  describe('addToCart', () => {
    it('adds new line when product exists', async () => {
      const productId = new mongoose.Types.ObjectId();
      req.body = { productId: productId.toString(), quantity: 1 };
      Product.findById = jest.fn().mockResolvedValue({ _id: productId });
      const save = jest.fn().mockResolvedValue();
      const user = {
        cartItems: [],
        save,
        populate: jest.fn().mockResolvedValue({
          cartItems: [{ product: productId, quantity: 1 }],
        }),
      };
      User.findById = jest.fn().mockResolvedValue(user);

      await addToCart(req, res);

      expect(user.cartItems.length).toBe(1);
      expect(save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('removeFromCart', () => {
    it('removes item by itemId', async () => {
      const lineId = new mongoose.Types.ObjectId();
      req.params.itemId = lineId.toString();
      const save = jest.fn().mockResolvedValue();
      const user = {
        cartItems: [
          { _id: lineId, product: new mongoose.Types.ObjectId(), quantity: 1 },
        ],
        save,
      };
      User.findById = jest.fn().mockResolvedValue(user);

      await removeFromCart(req, res);

      expect(user.cartItems.length).toBe(0);
      expect(save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: 'Item removed' });
    });
  });
});
