"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignIn = exports.validateSignup = void 0;
const express_validator_1 = require("express-validator");
//validation rules for signup request
exports.validateSignup = [
    //  Validate that 'name' is not an Empty string
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name is required"),
    //  Validate that 'email' is not empty and is a valid email format
    (0, express_validator_1.body)("email")
        .isString()
        .withMessage("Email must be a string")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address"),
    //  Validate that 'password' is a non-empty string and at least 8 characters
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    //  Middleware function to check validation results
    (req, res, next) => {
        //  Get Validation errors from the request
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            //  if errors exists, respond status code and an array of error
            res.status(400).json({ errors: errors.array() });
            return;
        }
        // if no validation errors, continue to next middleare or route handler
        next();
    },
];
// Middleware to validate signup request body
exports.validateSignIn = [
    // Validate that 'email' is a non-empty, valid email string
    (0, express_validator_1.body)("email")
        .isString()
        .withMessage("Email must be a string")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),
    // Validate that 'password' is a non-empty string and at least 8 characters long
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
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
    },
];
