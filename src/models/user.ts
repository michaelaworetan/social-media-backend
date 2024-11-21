import { Schema, model } from "mongoose"; 

//Defining an interface for the User model
interface iUser  {
    // id: Schema.Types.ObjectId     // Define _id as required and of type ObjectId
    name: string   
    email: string   
    password: string  
}

// creating a Mongoose schwma for the User model based on the interface
const userSchema = new Schema<iUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {timestamps: true}); // automatically adds createdAt and UpdatedAt to the database

//creating the User model using defined schema based on the interface
export const User = model<iUser>('User', userSchema);
