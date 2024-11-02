import { Schema, model, Document, Types } from "mongoose";  //import statements

//Define an interface for the User model to enforce structure
export interface iUser extends Document {
    _id: Types.ObjectId     // Define _id as required and of type ObjectId
    name: string     //user.s name
    email: string     //user's email
    password: string  //user's password
}

// create a Mongoose schwma for the User model based on the interface
const userSchema = new Schema<iUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {timestamps: true}); // automatically adds createdAt and UpdatedAt to the database

//creating the User model using defined schema based on the interface
export const User = model<iUser>('User', userSchema);
