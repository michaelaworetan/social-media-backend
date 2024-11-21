"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Setting the JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = "1h"; // Token expiretion time
//  function to generate a JWT
const generateToken = (userId) => {
    //  Create a token using user's ID, the secret key with the specified expiration time
    const token = jsonwebtoken_1.default.sign({ sub: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });
    return token;
};
exports.generateToken = generateToken;
// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
    var _a;
    // Get the token from the 'Authorization' header, typically in the format "Bearer <token>"
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    console.log(token);
    // Check if token exists; if not, respond with 401 (Unauthorized)
    if (!token) {
        res.status(401).json({ message: "Access Token is required" });
        return;
    }
    // Verify the token using JWT_SECRET
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, payload) => {
        // If there's an error i.e token is invalid or expired, respond with 403 (Forbidden)
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        const userId = payload === null || payload === void 0 ? void 0 : payload.sub;
        // Convert `_id` from string format to `Types.ObjectId` format for MongoDB compatibility
        req.user = { _id: userId }; // Store converted ObjectId in request object for downstream access
        console.log("Decoded user ID in authenticateToken:", req.user._id); // Log user ID for debugging purposes
        next();
    });
};
exports.authenticateToken = authenticateToken;
