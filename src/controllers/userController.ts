/**User signup and signin controllers */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { generateToken } from "../middlewares/authMiddleware";

//Signup function
export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    //Check if a user already exists with the provide email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //if the User already exist, return status code
      return res.status(400).json({ message: "User already exists" });
    }

    //Hashing the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user instance from the provided data
    const newUser = new User({
      name,
      email,
      password: hashedPassword, //Save the hashed password
    });

    //Save the new User to the database
    const signedUser = await newUser.save();

    return res.status(201).json(signedUser);
  } catch (error) {
    console.error(error); //log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

//signin function
export const signIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body; //Extract login data from the request
    //  Check if user exist in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //  Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or pasword" });
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    //if authentication is successful, respond with user details
    return res.status(200).json({
      message: "Sign-in successful",
      user: { name: user.name, emai: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GetAll users function
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await User.find({}, "name email"); //Retreive all users, selecting only name and email fields
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//  Get User by email function
export const getUserByEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Getting the email as request parameter
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return only the relevant fields (id, name, email) instead of the whole user object.
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get User By Id function
export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, "name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update User function
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User updated sucessfully", user: updateUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// DelEte User function
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
