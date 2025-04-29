"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/notesRoute.ts
const express_1 = require("express");
const NotesController_1 = require("../controller/NotesController");
const router = (0, express_1.Router)();
// Define your routes
router.get('/', NotesController_1.getAllNotes);
router.post('/upload', NotesController_1.UploadNote);
router.delete('/:id', NotesController_1.DeleteNote);
exports.default = router;
