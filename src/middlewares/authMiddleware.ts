// Importing required types and functions from external modules
import { Response, Request, NextFunction } from "express";  
import jwt from 'jsonwebtoken';                           
import { Types } from 'mongoose';                          
import { CustomJwtPayload } from '../types';               

// Setting the JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;       

// Middleware function to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    // Get the token from the 'Authorization' header, typically in the format "Bearer <token>"
    const token = req.header("Authorization")?.replace("Bearer", ""); 

    // Check if token exists; if not, respond with 401 (Unauthorized)
    if (!token) {
        res.status(401).json({ message: 'Access Token is required' });  
        return;                                                      
    }

    // Verify the token using JWT_SECRET
    jwt.verify(token, JWT_SECRET, (err, user) => {
        // If there's an error i.e token is invalid or expired, respond with 403 (Forbidden)
        if (err) {
            res.status(403).json({ message: 'Invalid Token' });        
            return;                                                 
        }

        // Type cast `user` to `CustomJwtPayload` to access custom properties defined in the JWT payload
        const typedUser = user as CustomJwtPayload;

        // Convert `_id` from string format to `Types.ObjectId` format for MongoDB compatibility
        req.user = { _id: new Types.ObjectId(typedUser._id) };          // Store converted ObjectId in request object for downstream access
        
        console.log('Decoded user ID in authenticateToken:', req.user._id);  // Log user ID for debugging purposes
        next();                                                          
    });
};
