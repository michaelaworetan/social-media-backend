/**user routes with validation and controllers* */
import { Router } from "express";

import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  signIn,
  signUp,
  updateUser,
} from "../controllers/userController";

import { validateSignIn, validateSignup } from "../middlewares/validateUser";
const router = Router(); //new Router

//  User Registration Route with validation middleware
router.post("/signup", validateSignup, signUp);

// User Sign-In Route with validation middleware
router.post("/signin", validateSignIn, signIn);

// Get All users
router.get("/", getAllUsers);

// Get User By email
router.get("/user/:email", getUserByEmail);

// Route to get a user by ID77
router.get("/user/:id", getUserById);

// Route to update a user by Id
router.put("/user/:id", updateUser);

// Route to delete a user by Id
router.delete("/user/:id", deleteUser);

export default router; // Export the router
