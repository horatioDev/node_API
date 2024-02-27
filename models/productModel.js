const products = require('../data/products');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils')

// Find all Products
function findAllProducts() {
  return new Promise((resolve, reject) => {
    console.log('GET All Products:', products)
    resolve(products);
  });
}

// Find Product by ID
function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((prod) => prod.id == id)
    console.log(`GET Product ${product.id}:`, product);
    resolve(product);
  });
}

// Create Product ID
function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile('./data/products.json', products)
    console.log('POST New Product:', product);
    resolve(newProduct);
  });
}

// Update by ID
function update(id, product) {
  return new Promise((resolve, reject) => {
    const idx = products.findIndex((prod) => prod.id === id);
    products[idx] = {id, ...product}
    writeDataToFile('./data/products.json', products)
    console.log('PUT Updated Product:', products[idx]);
    resolve(products[idx]);
  });
}

// Delete by ID
function remove(id) {
  return new Promise((resolve, reject) => {
    const remainingProducts = products.filter((prod) => prod.id !== id)
    resolve();
    console.log(`DELETE Removed Product ${id}:`, remainingProducts);
  });
}

module.exports = {
  create,
  findAllProducts,
  findById,
  update,
  remove
}