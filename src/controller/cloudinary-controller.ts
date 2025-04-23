import * as cloudinary from '../services/cloudinary-services';
import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { UploadApiResponse } from 'cloudinary';

const prisma = new PrismaClient();

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
    
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

  
    const result = await cloudinary.uploadImageToCloudinary(req.file.path) as UploadApiResponse;

    const image = await prisma.image.create({
      data: {
        ImageId: result.public_id, 
        // userId: req.body.userId, 
        url: result.url, 
      }
    });

    
    res.status(200).json({
      message: 'Image uploaded successfully',
      image, 
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
