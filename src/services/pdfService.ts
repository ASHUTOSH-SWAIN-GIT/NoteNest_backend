// services/pdfService.ts
const { PDFDocument } = require('pdf-lib');
const streamifier =  require('streamifier');
import { v2 as cloudinary } from 'cloudinary';

export const createPdfFromImages = async (imageBuffers: Buffer[]): Promise<Buffer> => {
  const pdfDoc = await PDFDocument.create();

  for (const buffer of imageBuffers) {
    let image;
    try {
      image = await pdfDoc.embedJpg(buffer);
    } catch {
      image = await pdfDoc.embedPng(buffer);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0 });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};

export const uploadPdfBufferToCloudinary = (pdfBuffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'pdfs' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
  });
};
