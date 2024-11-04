// src/types/express.d.ts
import { CustomJwtPayload } from './types'; // Adjust the path accordingly
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: CustomJwtPayload; // Adding the user property
        }
    }
}
