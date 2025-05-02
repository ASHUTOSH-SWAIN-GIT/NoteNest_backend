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
const handleImageToPdfUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageBuffers = req.files.map((file) => file.buffer);
        const pdfBuffer = yield (0, pdfService_1.createPdfFromImages)(imageBuffers);
        const uploadResult = yield (0, pdfService_1.uploadPdfBufferToCloudinary)(pdfBuffer);
        res.status(200).json({ pdfUrl: uploadResult.secure_url });
    }
    catch (error) {
        console.error('PDF Upload Error:', error);
        res.status(500).json({ message: 'Failed to upload PDF', error: error.message });
    }
});
exports.handleImageToPdfUpload = handleImageToPdfUpload;
