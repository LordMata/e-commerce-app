const express = require('express');
const {
  getProducts,
  getProduct,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, createNewProduct);
router.put('/:id', authMiddleware, updateExistingProduct);
router.delete('/:id', authMiddleware, deleteExistingProduct);

module.exports = router;
