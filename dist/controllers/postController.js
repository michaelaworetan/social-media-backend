"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const post_1 = require("../models/post");
// create Post function
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content } = req.body;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // `userId` is already an `ObjectId` type from `authenticateToken`
        console.log('User ID in createPost:', userId);
        if (!userId) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        // Create a new post instance with userId
        const newPost = new post_1.Post({
            title,
            content,
            userId, // userId now matches expected ObjectId format
        });
        // Save the post to the database
        const savedPost = yield newPost.save();
        // Respond with the created post and a success message
        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createPost = createPost;
//  Read all posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.Post.find();
        res.status(200).json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getPosts = getPosts;
// Read a post by id
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield post_1.Post.findById(id);
        if (!post) {
            res.status(404).json({ message: 'Post is not found' });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getPostById = getPostById;
//  Update a post by Id
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedPost = yield post_1.Post.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedPost) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json({ message: 'Post updated sucessfully', post: updatedPost });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updatePost = updatePost;
//  Delete post by Id
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPost = yield post_1.Post.findByIdAndDelete(id);
        if (!deletedPost) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deletePost = deletePost;
