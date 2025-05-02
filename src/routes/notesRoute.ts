// routes/notesRoute.ts
import { Router } from 'express';
import { getAllNotes, UploadNote,DeleteNote } from '../controller/NotesController';

const router = Router();

// Define your routes
router.get('/getnote', getAllNotes);
 router.post('/upload', UploadNote);
router.delete('/:Noteid',DeleteNote)

export default router;
