import { PrismaClient } from '@prisma/client';




const prisma = new PrismaClient();

interface NoteData {
  title: string;
  subject: string;
  price: number;
  description: string;
}



// Fetch all notes (no pagination)
export const getAllNotes = () => {
  return prisma.note.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

// Fetch paginated notes
export const getPaginatedNotes = (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return prisma.note.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' }
  });
};

// Create a new note
export const createNote = (data: NoteData) => {
  return prisma.note.create({
    data
  });
};

export const deleteNote = async (noteId: string) => {
    return prisma.note.delete({
        where: { Noteid:noteId },
    });
};



