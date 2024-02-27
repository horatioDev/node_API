# Node.js API Project

This is a simple Node.js API project for managing products.

## Getting Started

- http://localhost:8000/api/products will return all the available products in JSON format.
- http://localhost:8000/api/products/1  will return product with id 1 in JSON format if it exists, otherwise returns status code 404

### Usage 
- Postman API
- Thunder Client (VsCode)

### Features

- **CRUD Operations**: Perform CRUD (Create, Read, Update, Delete) operations on products.

- **RESTful API**: Follows RESTful principles for API endpoints.

- **Error Handling**: Includes error handling for robustness.

- **Modular Structure**: Organized into controllers, models, and utils for better code management.

- **HTTP Server**: Uses the built-in Node.js `http` module to create a server.

### Requirements

- Node.js (vXX.X.X)

- npm (Node Package Manager)

- npm install