import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs"
const prisma = new PrismaClient();


interface Userdata {
    name: string;
    email: string;
    password: string
}


export const signup = async (data: Userdata) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    return prisma.user.create({
        data: {
            username: data.name,
            email: data.email,
            password: hashedPassword,
        }
    })
}

export const login = () => {
    
}
