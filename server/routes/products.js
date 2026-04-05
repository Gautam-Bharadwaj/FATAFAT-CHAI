const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require('../controllers/productController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', requireAuth, requireAdmin, createProduct);
router.delete('/:id', requireAuth, requireAdmin, deleteProduct);

module.exports = router;
