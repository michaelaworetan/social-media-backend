"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**user routes **/
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validateUser_1 = require("../middlewares/validateUser");
const router = express_1.default.Router(); //new Router
//  User Registration Route with validation middleware
router.post("/signup", validateUser_1.validateSignup, userController_1.signUp);
// User Sign-In Route with validation middleware
router.post("/signin", validateUser_1.validateSignIn, userController_1.signIn);
// Get All users
router.get("/", userController_1.getAllUsers);
// Get User By email
router.get("/user/:email", userController_1.getUserByEmail);
// Route to get a user by ID77
router.get("/user/:id", userController_1.getUserById);
// Route to update a user by Id
router.put("/user/:id", userController_1.updateUser);
// Route to delete a user by Id
router.delete("/user/:id", userController_1.deleteUser);
exports.default = router;
