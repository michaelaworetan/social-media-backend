"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv")); //import dotenv to manage environmental variables
//Load evironmental variables from .env
dotenv_1.default.config();
//export configuration settings
exports.config = {
    mongoUri: (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017/social_media', //mongo uri
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000 //server port
};
