const db = require('../config/db');

const getAllProducts = () => db.any('SELECT * FROM products');
const getProductById = (id) => db.oneOrNone('SELECT * FROM products WHERE id = $1', [id]);
const createProduct = (name, price) => db.one('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *', [name, price]);
const updateProduct = (id, name, price) => db.one('UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *', [name, price, id]);
const deleteProduct = (id) => db.none('DELETE FROM products WHERE id = $1', [id]);

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
