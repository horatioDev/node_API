// Import the 'fs' module for file system operations
const fs = require('fs');

// Function to write data to a file
function writeDataToFile(filename, content) {
  // Synchronously write content to the specified file as a JSON string
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    // If an error occurs during writing, log the error
    if(err) {
      console.error('Error:', err);
    }
  });
}

// Function to asynchronously retrieve post data from a request
function getPostData(req) {
  // Return a promise for handling asynchronous operations
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      // Listen for incoming data chunks
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      // Once all data is received, resolve the promise with the accumulated body
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      // If an error occurs during data retrieval, reject the promise with the error
      reject(error);
    }
  });
}

// Export the functions for use in other modules
module.exports ={
  writeDataToFile,
  getPostData
};


/*
    This code snippet checks whether the request URL matches '/api/products' and the request method is 'GET'. If both conditions are true, the code block within the if statement will be executed. 

    if (req.url === '/api/products' && req.method === 'GET') {
      If the conditions are met, proceed with the following code block 
    
        This code snippet sets up a basic HTTP response with a status code of 200 (indicating success) and a Content-Type header of "text/html" to specify that the response body will contain HTML content. It then writes an HTML heading (<h1>Node API</h1>) to the response body and ends the response.
      
        res.statusCode = 200; // Set the HTTP status code to 200 (OK)
        res.setHeader('Content-Type','text/html'); // Set the Content-Type header to indicate that the response body is HTML
        res.write('<h1>Node API</h1>'); // Write the HTML content to the response body
        res.end(); // End the response.
    
        This code snippet sets up an HTTP response with a status code of 200 (indicating success) and a Content-Type header of "application/json" to specify that the response body will contain JSON content. It then converts the JavaScript object products to a JSON string using JSON.stringify() and writes it to the response body.  
    
        res.writeHead(200, jsonContentType); // Set the HTTP status code to 200 (OK) and specify the Content-Type as JSON
        res.write(JSON.stringify(products)); // Convert the JavaScript object `products` to a JSON string and write it to the response body
        res.end(); // End the response.
      
        res.writeHead(200, jsonContentType); // Set the HTTP status code to 200 (OK) and specify the Content-Type as JSON
    
        
        This code snippet efficiently converts the JavaScript object products to a JSON string using JSON.stringify() and immediately ends the response with the JSON string as the response body. It combines the conversion and response ending into a single statement, simplifying the code.
        
        res.end(JSON.stringify(products)); // Convert the JavaScript object `products` to a JSON string using JSON.stringify() and immediately end the response with the JSON string as the response body
      }else {
      
        This code snippet sets up an HTTP response with a status code of 404 (indicating that the requested route is not found) and a Content-Type header of "application/json" to specify that the response body will contain JSON content. It then converts the error message object to a JSON string using JSON.stringify() and ends the response with the JSON string as the response body.
      
        res.writeHead(404, jsonContentType); // Set the HTTP status code to 404 (Not Found) and specify the Content-Type as JSON
    
        res.end(JSON.stringify({ message: 'Route not found' })); // Convert the error message object to a JSON string and end the response with it as the response body
      }
  */