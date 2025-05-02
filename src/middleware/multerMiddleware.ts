import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(), // store in memory
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: 5MB per image
});
