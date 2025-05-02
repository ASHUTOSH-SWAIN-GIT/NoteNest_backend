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
const { PDFDocument } = require('pdf-lib');
const streamifier = require('streamifier');
const cloudinary_1 = require("cloudinary");
const createPdfFromImages = (imageBuffers) => __awaiter(void 0, void 0, void 0, function* () {
    const pdfDoc = yield PDFDocument.create();
    for (const buffer of imageBuffers) {
        let image;
        try {
            image = yield pdfDoc.embedJpg(buffer);
        }
        catch (_a) {
            image = yield pdfDoc.embedPng(buffer);
        }
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0 });
    }
    return yield pdfDoc.save();
});
const uploadPdfBufferToCloudinary = (pdfBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'raw' }, // raw required for PDFs
        (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        streamifier.createReadStream(Buffer.from(pdfBuffer)).pipe(uploadStream);
    });
};
module.exports = {
    createPdfFromImages,
    uploadPdfBufferToCloudinary,
};
