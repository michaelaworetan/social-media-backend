//connection settings 
import mongoose from "mongoose";   //import mongoose for mongodb interactions
import { config } from "./config"; //import configuration settings

console.log(config.mongoUri);

//function to connect to mongodb
export const connectDB = async () => {
    try {
        //connect to mongoDB using the URI from config
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB connected'); // Log success message
        
    } catch (err) {
        console.error(`MongoDB connection error:`, err); // logs any connection erorrs
        process.exit(1);  // Exit the process if connection fails
    }
};