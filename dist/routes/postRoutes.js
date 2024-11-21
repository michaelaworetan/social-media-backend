"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const validatePost_1 = require("../middlewares/validatePost");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)(); //new router
// Route for creating a new post
router.post("/", validatePost_1.validatePost, authMiddleware_1.authenticateToken, postController_1.createPost);
// Route for retrieving all posts
router.get("/", postController_1.getPosts);
// Route for retrieving a single post by ID
router.get("/:id", postController_1.getPostById);
// Route for updating a post
router.put("/:id", validatePost_1.validatePost, postController_1.updatePost);
// Route for deleting a post
router.delete("/:id", postController_1.deletePost);
exports.default = router;
