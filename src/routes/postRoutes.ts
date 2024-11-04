import { Router } from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postController";
import { validateCreatePost, validatePost } from "../middlewares/validateCreatePost";


const router = Router()       //new router

// Route for creating a new post
router.post('/', validateCreatePost, createPost);

// Route for retrieving all posts
router.get('/', getPosts);

// Route for retrieving a single post by ID
router.get('/:id', getPostById);

// Route for updating a post
router.put('/:id', validatePost, updatePost);

// Route for deleting a post
router.delete('/:id', deletePost);

export default router