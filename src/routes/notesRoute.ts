// routes/notesRoute.ts
import { Router } from 'express';
import { getAllNotes, UploadNote,DeleteNote } from '../controller/NotesController';

const router = Router();

// Define your routes
router.get('/', getAllNotes);
router.post('/upload', UploadNote);
router.delete(`/:id`,DeleteNote)

// ✅ This is important
export default router;
