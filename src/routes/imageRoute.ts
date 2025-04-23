import { Router } from "express";
import {uploadSingle} from "../middleware/imageUpload"
import {uploadImage} from "../controller/cloudinary-controller"


const router = Router()

router.post(`/upload`,uploadSingle,uploadImage)

export default router