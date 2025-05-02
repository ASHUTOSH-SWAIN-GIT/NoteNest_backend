// src/types/express.d.ts or src/@types/express.d.ts

declare namespace Express {
    export interface Request {
      user?: {
        id: string; // Adjust the type as per your user structure
        // Add other properties from your user object if needed
      };
    }
  }
  