import dotenv from "dotenv"; //import dotenv to manage environmental variables

//Load evironmental variables from .env
dotenv.config()


//export configuration settings
export const config = {
    mongoUri: process.env.MONGO_URI!, //mongo uri
    port: process.env.PORT ?? 3000    //server port
}



