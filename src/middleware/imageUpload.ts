import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

// Define storage configuration
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    // Define where to store the uploaded file
    cb(null, 'uploads/');
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    // Generate a unique filename based on timestamp and original name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the multer instance with storage configuration
const upload = multer({ storage });

// Export the single file upload function
export const uploadSingle = upload.single('file');