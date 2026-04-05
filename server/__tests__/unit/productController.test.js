jest.mock('../../models/Product');

const Product = require('../../models/Product');
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require('../../controllers/productController');

describe('productController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('returns array of products', async () => {
      const list = [{ name: 'Masala', price: 450 }];
      Product.find = jest
        .fn()
        .mockReturnValue({ lean: jest.fn().mockResolvedValue(list) });

      await getProducts(req, res);

      expect(Product.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(list);
    });

    it('returns 500 on failure', async () => {
      Product.find = jest.fn().mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('db')),
      });

      await getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to fetch products',
      });
    });
  });

  describe('getProductById', () => {
    it('returns single product', async () => {
      const doc = { _id: '1', name: 'Masala', price: 450 };
      req.params.id = '507f1f77bcf86cd799439011';
      Product.findById = jest
        .fn()
        .mockReturnValue({ lean: jest.fn().mockResolvedValue(doc) });

      await getProductById(req, res);

      expect(Product.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith(doc);
    });

    it('returns 404 when not found', async () => {
      req.params.id = '507f1f77bcf86cd799439011';
      Product.findById = jest
        .fn()
        .mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

      await getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('createProduct', () => {
    it('creates product', async () => {
      req.body = {
        name: 'New Chai',
        price: 499,
        description: 'Nice',
        image: '/x.png',
        category: 'Classic',
        stock: 10,
      };
      const created = { _id: 'abc', ...req.body };
      Product.create = jest.fn().mockResolvedValue(created);

      await createProduct(req, res);

      expect(Product.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });

    it('returns 400 without name or price', async () => {
      req.body = { name: 'x' };

      await createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('deleteProduct', () => {
    it('deletes product', async () => {
      req.params.id = '507f1f77bcf86cd799439011';
      const deleted = { _id: req.params.id };
      Product.findByIdAndDelete = jest.fn().mockResolvedValue(deleted);

      await deleteProduct(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Product deleted' })
      );
    });

    it('returns 404 when missing', async () => {
      req.params.id = '507f1f77bcf86cd799439011';
      Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
