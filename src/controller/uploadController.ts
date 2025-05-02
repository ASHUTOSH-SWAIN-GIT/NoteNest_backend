import { Response, Request } from 'express';
import { createPdfFromImages, uploadPdfBufferToCloudinary } from '../services/pdfService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handleImageToPdfUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, noteId } = req.body;
    const files = req.files as Express.Multer.File[]; // 👈 assert here

    // Check if userId and noteId are provided
    if (!userId || !noteId) {
      res.status(400).json({ message: 'userId and noteId are required' });
      return;
    }

    // Check if userId exists in the database
    const userExists = await prisma.user.findUnique({
      where: { Userid: userId },  // Correct field name for userId in the User model
    });

    if (!userExists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if noteId exists in the database
    const noteExists = await prisma.note.findUnique({
      where: { Noteid: noteId },  // Correct field name for noteId in the Note model
    });

    if (!noteExists) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    if (!files || files.length === 0) {
      res.status(400).json({ message: 'No images uploaded' });
      return;
    }

    const imageBuffers = files.map((file) => file.buffer);

    // Convert images to PDF buffer
    const pdfBuffer = await createPdfFromImages(imageBuffers);

    // Upload PDF to Cloudinary
    const uploadResult = await uploadPdfBufferToCloudinary(pdfBuffer);

    // Get the PDF URL from the upload result
    const pdfUrl = uploadResult.secure_url;

    // Insert into the database using Prisma
    const imageRecord = await prisma.image.create({
      data: {
        userId: userId,  // Store userId if available
        url: pdfUrl,
        noteId: noteId,  // Store the noteId to associate it with the correct note
      },
    });

    // Respond with the stored data and PDF URL
    res.status(200).json({
      message: 'Image to PDF uploaded successfully',
      pdfUrl: uploadResult.secure_url,
      imageRecord,
    });
  } catch (error: any) {
    console.error('Error creating/uploading PDF:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
