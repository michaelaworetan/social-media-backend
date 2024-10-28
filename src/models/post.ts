import { Schema, model, Document, Types } from 'mongoose'; // Import necessary components from Mongoose

// Define an interface for the Post model to enforce structure
interface iPost extends Document {
  title: string;     // Title of the post
  content: string;   // Content of the post
  userId: Types.ObjectId;    // ID of the user who created the post, with specific ObjectId type
}

// Create a Mongoose schema for the Post model
const postSchema = new Schema<iPost>({
  title: { type: String, required: true }, // Title is a required string
  content: { type: String, required: true }, // Content is a required string
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // userId references the User model
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the Post model using the defined schema
export const Post = model<iPost>('Post', postSchema); 
