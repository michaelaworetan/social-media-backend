"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
// Setting the JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
    var _a;
    // Get the token from the 'Authorization' header, typically in the format "Bearer <token>"
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "");
    // Check if token exists; if not, respond with 401 (Unauthorized)
    if (!token) {
        res.status(401).json({ message: 'Access Token is required' });
        return;
    }
    // Verify the token using JWT_SECRET
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        // If there's an error i.e token is invalid or expired, respond with 403 (Forbidden)
        if (err) {
            res.status(403).json({ message: 'Invalid Token' });
            return;
        }
        // Type cast `user` to `CustomJwtPayload` to access custom properties defined in the JWT payload
        const typedUser = user;
        // Convert `_id` from string format to `Types.ObjectId` format for MongoDB compatibility
        req.user = { _id: new mongoose_1.Types.ObjectId(typedUser._id) }; // Store converted ObjectId in request object for downstream access
        console.log('Decoded user ID in authenticateToken:', req.user._id); // Log user ID for debugging purposes
        next();
    });
};
exports.authenticateToken = authenticateToken;
