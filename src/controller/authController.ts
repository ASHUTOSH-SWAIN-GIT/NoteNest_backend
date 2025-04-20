import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client"
import * as authService from '../services/authService';



const prisma =  new PrismaClient()


export const SignUp = async (req:Request,res:Response) => {
   try {
    const {email,password,name} = req.body
    const user = await authService.signup({email,password,name})
    res.status(200).json({message:"User succesfully created",user})
   } catch (error) {
    console.error(error)
    res.status(500).json({message:"Oops! something went wrong "})
   }

}