import { Request, Response } from 'express';
import { Post, iPost } from '../models/post';

// create Post function
export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { title, content, userId } = req.body

    try {
        //  create a new post instance
        const newPost: iPost = new Post({
            title,
            content,
            userId
        });
        //  save the post to the new database
        await newPost.save();
        //  Responsd with the created post and a success message
        res.status(201).json({ message: 'Post created successfully', post: newPost})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//  Read all posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Read a post by id
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            res.status(404).json({ message: 'Post is not found'});
            return;
        }
        res.status(200).json(post);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//  Update a post by Id
export const updatePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, content} = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content}, { new: true});
        if (!updatedPost) {
            res.status(404).json( { message: 'Post not found'});
            return;
        }
        res.status(200).json({ message: 'Post updated sucessfully', post: updatedPost});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//  Delete post by Id
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            res.status(404).json( { message: 'Post not found'});
            return;
        }
        res.status(200).json({ message: 'Post deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


