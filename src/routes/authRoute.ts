// routes/notesRoute.ts
import { Router } from 'express';
import { SignUp } from "../controller/authController"


const router = Router();

// Define your routes
router.post('/signup',SignUp );
router.get(`/login`,)


// This is important
export default router;
