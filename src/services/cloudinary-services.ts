import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export interface UploadResult {
  public_id: string;
  url: string;
  format: string;
}

export const uploadImageToCloudinary = async (
  imagePath: string
): Promise<UploadResult> => {
  const result = await cloudinary.uploader.upload(imagePath, {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: 'auto',
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
    format: result.format,
  };
};
