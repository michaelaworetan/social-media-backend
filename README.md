# **Social Media Backend API**

A backend API for a social media platform that supports user registration, authentication, and CRUD operations on posts. This API is built with **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, and **JWT (JSON Web Token)** for secure user authentication.

---
## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [User Authentication](#user-authentication)
  - [Post Management](#post-management)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## **Project Overview**

This backend API provides essential social media functionalities such as user authentication and post-management. Users can register, log in, and create, read, update, or delete their posts after authentication.

---
## **Features**

- **User Authentication**: Register and log in with secure token-based authentication.
- **Post Management**: Users can create, read, update, and delete posts.
- **Validation and Error Handling**: Comprehensive error handling for all routes.
- **Secure Data Storage**: User passwords are hashed before storage.
- **MongoDB Database**: Data persistence with MongoDB.
---

## **Project Structure**

The following is the directory structure of the project:

```plaintext
social-media-backend/
│
├── src/
│   ├── controllers/
│   │   ├── authController.ts        # Authentication and user-related functions
│   │   └── postController.ts        # Post-related functions (CRUD)
│   │
│   ├── middleware/
│   │   └── authMiddleware.ts        # Middleware for token verification
│   │
│   ├── models/
│   │   ├── user.ts                  # User model schema
│   │   └── post.ts                  # Post model schema
│   │
│   ├── routes/
│   │   ├── authRoutes.ts            # Routes for authentication
│   │   └── postRoutes.ts            # Routes for post management
│   │
│   ├── types/
│   │   ├── express.d.ts             # Type definitions for Express (req.user)
│   │   └── types.ts                 # Custom types (e.g., JWT payload type)
│   │
│   ├── app.ts                       # Express app setup
│   └── server.ts                    # Server initialization
│
├── .env                             # Environment variables
├── .gitignore                       # Ignored files for Git
├── README.md                        # Project documentation
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                    # TypeScript configuration

```
---
## **Prerequisites**

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.postman.com/) (for testing API endpoints)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---
## **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/social-media-backend.git
   cd social-media-backend

2. **Install dependencies**:
  ```bash
  npm install
  ```
3. **Set up environment variables**: See [Environment] Variables section.

4. **Start MongoDB**: Ensure MongoDB runs locally or adjust settings in the environment variables if using a remote database.
  **Run the server**:
  ```
  npm run dev
  ```
---
## **Environment Variables**
  Create a .env file in the root directory with the following:
  
  plaintext
  ```
  JWT_SECRET=your_jwt_secret_key
  MONGO_URI=your_mongodb_connection_string
  ```
  - JWT_SECRET: Secret key for signing JWT tokens.
  - MONGO_URI: MongoDB connection string.
---
  ## **API Documentation**
  ### **User Authentication**
  #### **Register a New User**
  - Endpoint: POST /api/users/register
  - Description: Registers a new user.
  - Request Body:
  
  ``` json  
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
  #### **User Login**
  - Endpoint: POST /api/users/login
  - Description: Authenticates a user and returns a JWT token.
  - Request Body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ``` 

  #### **Get User Profile**
  - **Endpoint**: GET /api/users/profile
  - **Description**: Retrieves the authenticated user’s profile.
  - **Headers**:
    - Authorization: ```< your token>```
  ---
  ### **Post Management**

  **Create a Post**
  - **Endpoint**: POST /api/posts/
  - **Description**: Creates a new post for the authenticated user.
  - **Headers**:
    - Authorization:  ```<your token>```
  - **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ``` 
  ## **Get All Posts**
  - **Endpoint**: GET /api/posts/
  - **Description**: Fetches all posts.

  ## **Update a Post**
  - **Endpoint**: PUT /api/posts/:id
  - **Description**: Updates a post by ID for the authenticated user.
  - **Headers**:
    - Authorization: Bearer <token>
  - **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ``` 
  **Delete a Post**
  - **Endpoint**: DELETE /api/posts/:id
  - **Description**: Deletes a post by ID for the authenticated user.
  - **Headers**:
    - **Authorization**: Bearer <token>

  --- 
  ## **Testing**
  You can test the API endpoints using Postman:
  
  1. Register a new user.
  2. Log in with the user credentials to get an access token.
  3. Include the token in the Authorization header as Bearer <token> when testing protected routes.
  4. Test the CRUD routes for posts.

  ---
  ## **Technologies Used**
 -  **Node.js**: JavaScript runtime.
 - **Express.js**: Web framework for building RESTful APIs.
 - **TypeScript**: Typed superset of JavaScript.
 - **JWT**: JSON Web Tokens for authentication.
 - **MongoDB**: NoSQL database.
 - **Mongoose**: MongoDB ODM for Node.js.

  ---
  ## **Contributing**
  If you want to contribute:
  
 - Fork the repository.
 - Create a new branch for your feature or bug fix.
 - Commit your changes.
 - Push to your fork and submit a pull request.

  ---
  ## **License**
  This project is licensed under the MIT License.
   ``` 
  This version maintains the markdown formatting throughout, using headings, lists, code block

  ```
