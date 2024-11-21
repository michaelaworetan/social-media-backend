// Importing required types and functions from external modules
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

// Setting the JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = "1h"; // Token expiretion time

//  function to generate a JWT
export const generateToken = (userId: string): string => {
  //  Create a token using user's ID, the secret key with the specified expiration time
  const token = jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
  return token;
};

export interface userRequest extends Request {
  user?: { _id: string | Types.ObjectId };
}

// Middleware function to authenticate JWT token
export const authenticateToken = (
  req: userRequest,
  res: Response,
  next: NextFunction
): void => {
  // Get the token from the 'Authorization' header, typically in the format "Bearer <token>"
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log(token);

  // Check if token exists; if not, respond with 401 (Unauthorized)
  if (!token) {
    res.status(401).json({ message: "Access Token is required" });
    return;
  }

  // Verify the token using JWT_SECRET
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    // If there's an error i.e token is invalid or expired, respond with 403 (Forbidden)
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    const userId = payload?.sub;

    // Convert `_id` from string format to `Types.ObjectId` format for MongoDB compatibility
    req.user = { _id: userId as string | Types.ObjectId }; // Store converted ObjectId in request object for downstream access

    console.log("Decoded user ID in authenticateToken:", req.user._id); // Log user ID for debugging purposes
    next();
  });
};
