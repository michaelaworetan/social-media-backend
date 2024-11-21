import { Request, Response } from "express";
import { Post } from "../models/post";
import { userRequest } from "../middlewares/authMiddleware";

// create Post function
export const createPost = async (
  req: userRequest,
  res: Response
): Promise<any> => {
  const { title, content } = req.body;

  try {
    const userId = req.user?._id; // `userId` is already an `ObjectId` type from `authenticateToken`

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Create a new post instance with userId
    const newPost = new Post({
      title,
      content,
      userId, // userId now matches expected ObjectId format
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Respond with the created post and a success message
    return res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//  Read all posts
export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Read a post by id
export const getPostById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post is not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//  Update a post by Id
export const updatePost = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res
      .status(200)
      .json({ message: "Post updated sucessfully", post: updatedPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//  Delete post by Id
export const deletePost = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
