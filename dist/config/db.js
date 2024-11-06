"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
//connection settings 
const mongoose_1 = __importDefault(require("mongoose")); //import mongoose for mongodb interactions
const config_1 = require("./config"); //import configuration settings
//function to connect to mongodb
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //connect to mongoDB using the URI from config
        yield mongoose_1.default.connect(config_1.config.mongoUri);
        console.log('MongoDB connected'); // Log success message
    }
    catch (err) {
        console.error(`MongoDB connection error:`, err); // logs any connection erorrs
        process.exit(1); // Exit the process if connection fails
    }
});
exports.connectDB = connectDB;
