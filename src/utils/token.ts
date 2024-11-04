import  jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;    //  secret key token
const JWT_EXPIRATION ='1h';         // Token expiretion time

// console.log(JWT_SECRET);

//  function to generate a JWT
export const generateToken = (userId: string): string => {
    //  Create a token using user's ID, the secret key with the specified expiration time
    const token = jwt.sign({id: userId}, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
    return token;
};
