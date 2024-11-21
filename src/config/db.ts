import mongoose from "mongoose"; //import mongoose for mongodb interactions
import dotenv from "dotenv";

dotenv.config();

//function to connect to mongodb
export const connectDB = async () => {
  try {
    //connect to mongoDB using the URI 
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected"); 
  } catch (err) {
    console.error(`MongoDB connection error:`, err); 
    process.exit(1); // Exit the process if connection fails
  }
};
