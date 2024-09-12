const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  } = require('../models/productModel');
  const createError = require('http-errors');
  
  const getProducts = async (req, res, next) => {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  };
  
  const getProduct = async (req, res, next) => {
    try {
      const product = await getProductById(req.params.id);
      // if (!product) {
      //   return res.status(404).json({ message: 'Product not found' });
      // }
      if (!product) {
        return next(createError(404, 'Product not found'));
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  };
  
  const createNewProduct = async (req, res, next) => {
    const { name, price } = req.body;
    try {
      const product = await createProduct(name, price);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };
  
  const updateExistingProduct = async (req, res, next) => {
    const { name, price } = req.body;
    try {
      const product = await updateProduct(req.params.id, name, price);
      res.json(product);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteExistingProduct = async (req, res, next) => {
    try {
      await deleteProduct(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { getProducts, getProduct, createNewProduct, updateExistingProduct, deleteExistingProduct };
  