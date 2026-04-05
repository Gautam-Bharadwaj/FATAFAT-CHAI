const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} = require('../controllers/cartController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, getCart);
router.post('/', requireAuth, addToCart);
router.patch('/:itemId', requireAuth, updateCartItemQuantity);
router.delete('/:itemId', requireAuth, removeFromCart);

module.exports = router;
