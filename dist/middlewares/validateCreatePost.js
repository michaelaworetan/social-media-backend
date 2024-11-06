"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = exports.validateCreatePost = void 0;
const express_validator_1 = require("express-validator");
// Middleware to validate create post request body
exports.validateCreatePost = [
    (0, express_validator_1.body)('title')
        .isString().withMessage('Post title must be a string')
        .notEmpty().withMessage('Post title is required'),
    (0, express_validator_1.body)('content')
        .isString().withMessage('Post content must be a string')
        .notEmpty().withMessage('Post content is required'),
    (0, express_validator_1.body)('userId')
        .isString().withMessage('User ID must be a string')
        .optional(),
    // Middleware function to check validation results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // If errors exist, respond with a 400 status code and an array of error messages
            res.status(400).json({ errors: errors.array() });
            return; // Exit the middleware
        }
        // If no validation errors, continue to the next middleware or route handler
        next();
    }
];
// Middleware to validate post request body
exports.validatePost = [
    (0, express_validator_1.body)('title')
        .isString().withMessage('Post title must be a string')
        .notEmpty().withMessage('Post title is required'),
    (0, express_validator_1.body)('content')
        .isString().withMessage('Post content must be a string')
        .notEmpty().withMessage('Post content is required'),
    // Middleware function to check validation results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // If errors exist, respond with a 400 status code and an array of error messages
            res.status(400).json({ errors: errors.array() });
            return; // Exit the middleware
        }
        // If no validation errors, continue to the next middleware or route handler
        next();
    }
];
