import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// // Middleware to validate post request body
export const validatePost = [
    body('title')
        .isString().withMessage('Post title must be a string')
        .notEmpty().withMessage('Post title is required'),
    body('content')
        .isString().withMessage('Post content must be a string')
        .notEmpty().withMessage('Post content is required'),

    // Middleware function to check validation results
    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If errors exist, respond with a 400 status code and an array of error messages
            res.status(400).json({ errors: errors.array() });
            return; // Exit the middleware
        }
        // If no validation errors, continue to the next middleware or route handler
        next();
    }
];
