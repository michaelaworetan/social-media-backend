"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUserByEmail = exports.getAllUsers = exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const token_1 = require("../utils/token");
//Signup function
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body; //Destructure the user data from request body 
    try {
        //Check if a user already exists with the provide email
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            //if the User already exist, return status code
            res.status(400).json({ message: 'User already exists' });
            return; //Exit
        }
        //Hashing the password before saving the user
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        //create a new user instance from the provided data
        const newUser = new user_1.User({
            name,
            email,
            password: hashedPassword //Save the hashed password
        });
        //Save the new User to the database
        yield newUser.save();
        //  Respond the generated token with status code
        res.status(201).json({ newUser });
    }
    catch (error) {
        // Handle errors that occur during the process
        console.error(error); //log the error for degging
        res.status(500).json({ message: 'Server error' }); // respond status for server errors 
    }
});
exports.signUp = signUp;
//signin function
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; //Extract login data from the request
    try {
        //  Check if user exist in the database
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        //  Compare provided password with stored hashed password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or pasword' });
            return;
        }
        // Generate JWT token
        const token = (0, token_1.generateToken)(user._id.toString()); // Convert _id to string if it's an ObjectId and type assertion to tell typescript _id existing
        //if authentication is successful, respond with user details
        res.status(200).json({ message: 'Sign-in successful', user: { name: user.name, emai: user.email }, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.signIn = signIn;
// GetAll users function
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({}, 'name email'); //Retreive all users, selecting only name and email fields
        res.status(200).json(users);
    }
    catch (error) {
        console.error();
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllUsers = getAllUsers;
//  Get User by email function
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Return only the relevant fields, like name, email, and timestamps, instead of the whole user object.
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    catch (error) {
        console.error("Error retrieving user by email:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getUserByEmail = getUserByEmail;
// Get User By Id function
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.User.findById(id, 'name email');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error retrieving user by id:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getUserById = getUserById;
// Update User function
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updateUser = yield user_1.User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true });
        if (!updateUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User updated sucessfully', user: updateUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateUser = updateUser;
// DelEte User function
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield user_1.User.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteUser = deleteUser;