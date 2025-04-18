"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.DownloadNote = exports.DeleteNote = exports.UploadNote = exports.getAllNotes = void 0;
const client_1 = require("@prisma/client");
const noteService = __importStar(require("../services/noteService"));
const prisma = new client_1.PrismaClient;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteService.getAllNotes();
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ error: `failed fetching the notes` });
    }
});
exports.getAllNotes = getAllNotes;
const UploadNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subject, price, description } = req.body;
        if (![title, subject, price, description].every(Boolean)) {
            res.status(400).json({ error: `missing required fields` });
        }
        const newNote = yield noteService.createNote({
            title,
            subject,
            price,
            description,
        });
        res.status(201).json(newNote);
    }
    catch (error) {
        console.error('UploadNote Error:', error); // 👈 Add this
        res.status(500).json({ error: `Internal server error` });
    }
});
exports.UploadNote = UploadNote;
const DeleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletednote = yield noteService.deleteNote(id);
        if (!deletednote) {
            res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted succesfully!", deletednote });
    }
    catch (error) {
        console.error("Delete Note Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.DeleteNote = DeleteNote;
const DownloadNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId, userId } = req.body;
        if (!noteId || !userId) {
            return res.status(400).json({ error: "noteId and userId are required" });
        }
        const alreadyDownloaded = yield prisma.downloads.findFirst({
            where: { noteId, userId },
        });
        if (alreadyDownloaded) {
            res.status(200).json({ message: "file already downloaded" });
        }
        const download = yield prisma.downloads.create({
            data: {
                Note: {
                    connect: { id: noteId }
                },
                User: {
                    connect: { Userid: userId }
                }
            },
        });
    }
    catch (error) {
    }
});
exports.DownloadNote = DownloadNote;
