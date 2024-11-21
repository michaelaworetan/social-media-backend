import express, { Request, Response } from "express"; //import express framework
import dotenv from "dotenv"; //import dotenv to manage enviroment variable
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

//Load environment variables from the .env file
dotenv.config();

//create an instance offf the Express application
const app = express();

//middleware to parse incoming JSON request
app.use(express.json());

// Basic route to test if server works
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, Social Media Platfrom");
});

//Use routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//connect to MongoDB
connectDB();

//set the port number for the server to listen on
const PORT = process.env.PORT!;

//start the express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); //Log server start message
});
