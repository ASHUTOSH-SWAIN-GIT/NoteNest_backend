import multer from 'multer';
import { Request, Response, NextFunction } from 'express';


const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
   
    cb(null, 'uploads/');
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage });


export const uploadSingle = upload.single('file');