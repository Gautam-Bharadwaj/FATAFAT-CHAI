const Product = require('../models/Product');

async function getProducts(req, res) {
  try {
    const products = await Product.find().lean();
    return res.json(products);
  } catch {
    return res.status(500).json({ message: 'Failed to fetch products' });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch {
    return res.status(400).json({ message: 'Invalid product id' });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price, description, image, category, stock } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ message: 'name and price are required' });
    }
    const product = await Product.create({
      name,
      price,
      description: description ?? '',
      image: image ?? '',
      category: category ?? 'Classic',
      stock: stock ?? 0,
    });
    return res.status(201).json(product);
  } catch {
    return res.status(500).json({ message: 'Failed to create product' });
  }
}

async function deleteProduct(req, res) {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ message: 'Product deleted', id: deleted._id });
  } catch {
    return res.status(400).json({ message: 'Invalid product id' });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
};
