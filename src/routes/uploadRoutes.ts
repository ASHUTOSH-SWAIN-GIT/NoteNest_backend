import express from 'express';
import multer from 'multer';
import { handleImageToPdfUpload } from '../controller/uploadController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-images', upload.array('images'), handleImageToPdfUpload);


export default router