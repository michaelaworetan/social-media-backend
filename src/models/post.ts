import { Schema, model } from 'mongoose'; // Import necessary components from Mongoose

// Defining Post interface 
export interface iPost  {
  title: string;    
  content: string;   
  userId: Schema.Types.ObjectId;    // ID of the user who created the post, with specific ObjectId type
}

// Create a Mongoose schema for the Post model
const postSchema = new Schema<iPost>({
  title: { type: String, required: true },
  content: { type: String, required: true }, 
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // userId references the User model
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the Post model using the defined schema
export const Post = model<iPost>('Post', postSchema); 
