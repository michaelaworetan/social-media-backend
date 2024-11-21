/**validation login for signup and signin request */
import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

//validation rules for signup request
export const validateSignup = [
  //  Validate that 'name' is not an Empty string
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),
  //  Validate that 'email' is not empty and is a valid email format
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  //  Validate that 'password' is a non-empty string and at least 8 characters
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  //  Middleware function to check validation results
  (req: Request, res: Response, next: NextFunction): void => {
    //  Get Validation errors from the request
    const errors = validationResult(req);
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
export const validateSignIn = [
  // Validate that 'email' is a non-empty, valid email string
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  // Validate that 'password' is a non-empty string and at least 8 characters long
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

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
  },
];
