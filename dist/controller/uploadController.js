"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleImageToPdfUpload = void 0;
const pdfService_1 = require("../services/pdfService");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const handleImageToPdfUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, noteId } = req.body;
        const files = req.files; // 👈 assert here
        // Check if userId and noteId are provided
        if (!userId || !noteId) {
            res.status(400).json({ message: 'userId and noteId are required' });
            return;
        }
        // Check if userId exists in the database
        const userExists = yield prisma.user.findUnique({
            where: { Userid: userId }, // Correct field name for userId in the User model
        });
        if (!userExists) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Check if noteId exists in the database
        const noteExists = yield prisma.note.findUnique({
            where: { Noteid: noteId }, // Correct field name for noteId in the Note model
        });
        if (!noteExists) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        if (!files || files.length === 0) {
            res.status(400).json({ message: 'No images uploaded' });
            return;
        }
        const imageBuffers = files.map((file) => file.buffer);
        // Convert images to PDF buffer
        const pdfBuffer = yield (0, pdfService_1.createPdfFromImages)(imageBuffers);
        // Upload PDF to Cloudinary
        const uploadResult = yield (0, pdfService_1.uploadPdfBufferToCloudinary)(pdfBuffer);
        // Get the PDF URL from the upload result
        const pdfUrl = uploadResult.secure_url;
        // Insert into the database using Prisma
        const imageRecord = yield prisma.image.create({
            data: {
                userId: userId, // Store userId if available
                url: pdfUrl,
                noteId: noteId, // Store the noteId to associate it with the correct note
            },
        });
        // Respond with the stored data and PDF URL
        res.status(200).json({
            message: 'Image to PDF uploaded successfully',
            pdfUrl: uploadResult.secure_url,
            imageRecord,
        });
    }
    catch (error) {
        console.error('Error creating/uploading PDF:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
exports.handleImageToPdfUpload = handleImageToPdfUpload;
