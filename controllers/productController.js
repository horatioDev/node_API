// Import the Product model and the getPostData utility function
const Product = require('../models/productModel');
const { getPostData } = require('../utils');

// Function to retrieve all products
async function getProducts(req, res) {
  // Define the content type for the response
  const jsonContentType = { 'Content-Type': 'application/json' };
  try {
    // Retrieve all products
    const products = await Product.findAllProducts();
    // Send a success response with the list of products
    res.writeHead(200, jsonContentType);
    res.end(JSON.stringify(products));
  } catch (err) {
    // Handle errors
    console.error('Error:', err);
  }
}

// Function to retrieve a product by ID
async function getProduct(req, res, id) {
  // Define the content type for the response
  const jsonContentType = { 'Content-Type': 'application/json' };
  try {
    // Find the product by ID
    const product = await Product.findById(id);
    // If the product is not found, send a 404 response
    if (!product) {
      res.writeHead(404, jsonContentType);
      res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      // If the product is found, send a success response with the product data
      res.writeHead(200, jsonContentType);
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    // Handle errors
    console.error('Error:', err);
  }
}

// Function to create a new product
async function createProduct(req, res) {
  // Define the content type for the response
  const jsonContentType = { 'Content-Type': 'application/json' };
  try {
    // Retrieve the request body containing product data
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const product = { name, description, price };
    // Create the new product
    const newProduct = await Product.create(product);
    // Send a success response with the new product data
    res.writeHead(201, jsonContentType);
    return res.end(JSON.stringify(newProduct));
  } catch (err) {
    // Handle errors
    console.error('Error:', err);
  }
}

// Function to update an existing product by ID
async function updateProduct(req, res, id) {
  // Define the content type for the response
  const jsonContentType = { 'Content-Type': 'application/json' };
  try {
    // Find the product by ID
    const product = await Product.findById(id);
    // If the product is not found, send a 404 response
    if (!product) {
      res.writeHead(404, jsonContentType);
      res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      // Retrieve the request body containing updated product data
      const body = await getPostData(req);
      const { name, description, price } = JSON.parse(body);
      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
      };
      // Update the product
      const updatedProduct = await Product.update(id, productData);
      // Send a success response with the updated product data
      res.writeHead(200, jsonContentType);
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (err) {
    // Handle errors
    console.error('Error:', err);
  }
}

// Function to delete a product by ID
async function deleteProduct(req, res, id) {
  // Define the content type for the response
  const jsonContentType = { 'Content-Type': 'application/json' };
  try {
    // Find the product by ID
    const product = await Product.findById(id);
    // If the product is not found, send a 404 response
    if (!product) {
      res.writeHead(404, jsonContentType);
      res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      // Remove the product
      await Product.remove(id);
      // Send a success response indicating the product has been deleted
      res.writeHead(200, jsonContentType);
      res.end(JSON.stringify({ message: `Product ${id} deleted` }));
    }
  } catch (err) {
    // Handle errors
    console.error('Error:', err);
    // Send a 500 response for internal server error
    res.writeHead(500, jsonContentType);
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
}

// Export the functions for use in other modules
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
};
