import {Request,Response,NextFunction} from "express"

export const errorHandler = (err:any,req:Request,res:Response,next:NextFunction) => {
    console.error(err)
    res.send(500).json({error:`something went wrong `})
}