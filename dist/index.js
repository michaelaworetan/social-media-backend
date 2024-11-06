"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //import express framework 
const dotenv_1 = __importDefault(require("dotenv")); //import dotenv to manage enviroment variable
const db_1 = require("./config/db");
const config_1 = require("./config/config");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
//Load environment variables from the .env file
dotenv_1.default.config();
//create an instance offf the Express application
const app = (0, express_1.default)();
//middleware to parse incoming JSON request 
app.use(express_1.default.json());
// Basic route to test if server works
app.get('/api', (req, res) => {
    res.send('Hello, Social Media Platfrom');
});
//Use routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
//connect to MongoDB
(0, db_1.connectDB)();
//set the port number for the server to listen on 
const PORT = (_a = config_1.config.port) !== null && _a !== void 0 ? _a : 3000;
//start the express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); //Log server start message
});
