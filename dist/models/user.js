"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// creating a Mongoose schwma for the User model based on the interface
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true }); // automatically adds createdAt and UpdatedAt to the database
//creating the User model using defined schema based on the interface
exports.User = (0, mongoose_1.model)("User", userSchema);
