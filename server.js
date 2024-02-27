// Import necessary modules
const http = require('http');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productController');
const PORT = process.env.PORT || 8000;

// Create server
const server = http.createServer((req, res) => {
  // Define content type
  const jsonContentType = {'Content-Type': 'application/json'};

  // Route handling
  if (req.url === '/api/products' && req.method === 'GET') {
    // Call getProducts function to handle GET request for all products
    getProducts(req, res)
  } else if (req.url.match(/\/api\/products\/([a-f0-9-]+)/) && req.method === 'GET') { 
    // Extract product ID from URL
    const id = req.url.split('/')[3]
    // Call getProduct function to handle GET request for a specific product
    getProduct(req, res, id)
  } else if (req.url === '/api/products' && req.method === 'POST') {
    // Call createProduct function to handle POST request for creating a new product
    createProduct(req, res)
  } else if (req.url.match(/\/api\/products\/([a-f0-9-]+)/) && req.method === 'PUT') { 
    // Extract product ID from URL
    const id = req.url.split('/')[3]
    // Call updateProduct function to handle PUT request for updating a product
    updateProduct(req, res, id)
  } else if (req.url.match(/\/api\/products\/([a-f0-9-]+)/) && req.method === 'DELETE') { 
    // Extract product ID from URL
    const id = req.url.split('/')[3]
    // Call deleteProduct function to handle DELETE request for deleting a product
    deleteProduct(req, res, id)
  } else {
    // If the requested route is not found, send a 404 response
    res.writeHead(404, jsonContentType); // Set the HTTP status code to 404 (Not Found) and specify the Content-Type as JSON
    res.end(JSON.stringify({ message: 'Route not found' })); // Convert the error message object to a JSON string and end the response with it as the response body
  }

});

// Listen for server
server.listen(PORT, () => {
  console.log(`NODE API: Server running on localhost:${PORT}`);
})
