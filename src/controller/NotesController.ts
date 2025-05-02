import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import * as noteService from '../services/noteService';
const prisma = new PrismaClient



export const getAllNotes = async (req: Request, res: Response) => {
    try {


        const notes = await noteService.getAllNotes()
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ error: `failed fetching the notes` })
    }
}

export const UploadNote = async (req: Request, res: Response) => {

    try {
        const { title, subject, price, description } = req.body
        if (![title, subject, price, description].every(Boolean)) {
            res.status(400).json({ error: `missing required fields` })
        }
        const newNote = await noteService.createNote({
            title,
            subject,
            price,
            description,

        });
        res.status(201).json(newNote)
    } catch (error) {
        console.error('UploadNote Error:', error); // 👈 Add this
        res.status(500).json({ error: `Internal server error` });
    }
}

export const DeleteNote = async (req: Request, res: Response) => {
    const { Noteid } = req.params
    try {
        const deletednote = await noteService.deleteNote(Noteid)
        if (!deletednote) {
            res.status(404).json({ error: "Note not found" })
        }
        res.status(200).json({ message: "Note deleted succesfully!", deletednote })
    } catch (error) {
        console.error("Delete Note Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const DownloadNote = async (req: Request, res: Response) => {
    try {
        const { noteId, userId } = req.body
        if (!noteId || !userId) {
            return res.status(400).json({ error: "noteId and userId are required" });
        }
        const alreadyDownloaded = await prisma.downloads.findFirst({
            where: { noteId, userId },
        });
        if(alreadyDownloaded){
            res.status(200).json({message:"file already downloaded"})
        }
        const download = await prisma.downloads.create({
            data: {
              Note: {
                connect: { Noteid: noteId }
              },
              User: {
                connect: { Userid: userId }
              }
            },
          });
          
    } catch (error) {

    }
}   


