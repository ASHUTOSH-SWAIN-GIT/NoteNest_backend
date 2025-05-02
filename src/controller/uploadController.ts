import { Response, Request } from 'express';
import { createPdfFromImages, uploadPdfBufferToCloudinary } from '../services/pdfService';



export const handleImageToPdfUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[]; // 👈 assert here
    ;
    if (!files || files.length === 0) {
      res.status(400).json({ message: 'No images uploaded' });
      return;
    }

    const imageBuffers = files.map(file => file.buffer);

    const pdfBuffer = await createPdfFromImages(imageBuffers);
    const uploadResult = await uploadPdfBufferToCloudinary(pdfBuffer);

    res.status(200).json({ pdfUrl: uploadResult.secure_url });
  } catch (error: any) {
    console.error('Error creating/uploading PDF:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
