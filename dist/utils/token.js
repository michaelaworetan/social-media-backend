"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET; //  secret key token
const JWT_EXPIRATION = '1h'; // Token expiretion time
// console.log(JWT_SECRET);
//  function to generate a JWT
const generateToken = (userId) => {
    //  Create a token using user's ID, the secret key with the specified expiration time
    const token = jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
};
exports.generateToken = generateToken;
