/**User signup and signin controllers */
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User, iUser } from '../models/user'

//Signup function
export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password} = req.body        //Destructure the user data from request body 

    try {
       //Check if a user already exists with the provide email
       const existingUser = await User.findOne({ email });
       if(existingUser) {
        //if the User already exist, return status code
        res.status(400).json({ message: 'User already exists' });
        return; //Exit
       }

       //Hashing the password before saving the user
       const hashedPassword = await bcrypt.hash(password, 10);

       //create a new user instance from the provided data
       const newUser: iUser = new User({
        name,
        email,
        password: hashedPassword    //Save the hashed password
       });

       //Save the new User to the database
       await newUser.save();

       //  Respond the generated token with status code
       res.status(201).json({ newUser });
    } catch(error) {   
        // Handle errors that occur during the process
        console.error(error);  //log the error for degging
        res.status(500).json({ message: 'Server error' });   // respond status for server errors 
    }

};

//signin function
export const signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body   //Extract login data from the request
    
    try {
        //  Check if user exist in the database
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password'});
            return;
        }

        //  Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or pasword'});
            return;
        }

        //if authentication is successful, respond with user details
        res.status(200).json({ message: 'Sign-in successful', user: { name: user.name, emai: user.email } });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// GetAll users function
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({}, 'name email');    //Retreive all users, selecting only name and email fields
        res.status(200).json(users);
    } 
    catch (error) {
        console.error();
        res.status(500).json({ message: 'Server error'});
    }
};

//  Get User by email function
export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Return only the relevant fields, like name, email, and timestamps, instead of the whole user object.
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error("Error retrieving user by email:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get User By Id function
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req. params

    try {
        const user = await User.findById(id, 'name email');
        if (!user) {
            res.status(404).json({ message: 'User not found'});
            return;
        }
        res.status(200).json(user);
    } 
    catch (error) {
        console.error("Error retrieving user by id:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Update User function
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email } = req.body;
    
    try {
        const updateUser = await User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true});
        if (!updateUser) {
            res.status(404).json({ message: 'User not found'});
            return
        }
        res.status(200).json({ message: 'User updated sucessfully', user: updateUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    
}

// DelEte User function
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
     const { id } = req.params
     try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found'});
            return;
        }
        res.status(200).json({ message: 'User deleted successfully'});
     } 
     catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
     }
}


