const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

async function getCart(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .populate('cartItems.product')
      .lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const items = (user.cartItems || [])
      .map((line) => {
        const p = line.product;
        if (!p) {
          return null;
        }
        return {
          itemId: line._id.toString(),
          product: p,
          quantity: line.quantity,
          lineTotal: p.price * line.quantity,
        };
      })
      .filter(Boolean);
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    return res.json({ items, subtotal });
  } catch {
    return res.status(500).json({ message: 'Failed to load cart' });
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Valid productId is required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const existing = user.cartItems.find(
      (c) => c.product.toString() === productId
    );
    if (existing) {
      existing.quantity += qty;
    } else {
      user.cartItems.push({ product: productId, quantity: qty });
    }
    await user.save();
    await user.populate('cartItems.product');
    return res
      .status(201)
      .json({ message: 'Added to cart', cartItems: user.cartItems });
  } catch {
    return res.status(500).json({ message: 'Failed to update cart' });
  }
}

async function removeFromCart(req, res) {
  try {
    const { itemId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const before = user.cartItems.length;
    user.cartItems = user.cartItems.filter(
      (c) => c._id.toString() !== itemId && c.product.toString() !== itemId
    );
    if (user.cartItems.length === before) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    await user.save();
    return res.json({ message: 'Item removed' });
  } catch {
    return res.status(500).json({ message: 'Failed to remove item' });
  }
}

async function updateCartItemQuantity(req, res) {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const qty = parseInt(quantity, 10);
    if (Number.isNaN(qty) || qty < 1) {
      return res.status(400).json({ message: 'quantity must be at least 1' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const line = user.cartItems.find((c) => c._id.toString() === itemId);
    if (!line) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    line.quantity = qty;
    await user.save();
    await user.populate('cartItems.product');
    return res.json({ message: 'Cart updated', cartItems: user.cartItems });
  } catch {
    return res.status(500).json({ message: 'Failed to update cart' });
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
};
