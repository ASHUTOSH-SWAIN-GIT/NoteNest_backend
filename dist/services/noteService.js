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
exports.deleteNote = exports.createNote = exports.getPaginatedNotes = exports.getAllNotes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Fetch all notes (no pagination)
const getAllNotes = () => {
    return prisma.note.findMany({
        orderBy: { createdAt: 'desc' }
    });
};
exports.getAllNotes = getAllNotes;
// Fetch paginated notes
const getPaginatedNotes = (page, limit) => {
    const skip = (page - 1) * limit;
    return prisma.note.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
    });
};
exports.getPaginatedNotes = getPaginatedNotes;
// Create a new note
const createNote = (data) => {
    return prisma.note.create({
        data
    });
};
exports.createNote = createNote;
const deleteNote = (noteId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.note.delete({
        where: { Noteid: noteId },
    });
});
exports.deleteNote = deleteNote;
