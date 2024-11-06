"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose"); // Import necessary components from Mongoose
// Create a Mongoose schema for the Post model
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true }, // Title is a required string
    content: { type: String, required: true }, // Content is a required string
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }, // userId references the User model
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps
// Create the Post model using the defined schema
exports.Post = (0, mongoose_1.model)('Post', postSchema);
