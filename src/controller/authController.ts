// controllers/authController.ts
import { Request, Response } from 'express';
import supabase from '../lib/supabaseClient';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/callback', // Change to your frontend
      },
    });

    if (error) throw error;

    return res.json({ url: data.url });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ message: 'Login failed' });
  }
};

export const handleCallback = async (req: Request, res: Response) => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = data.user;

  // Save to DB
  const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: user.email!,
        username: user.user_metadata.full_name,
        ProfilePic: user.user_metadata.avatar_url,
      },
    });
  }

  return res.json({ message: 'Logged in', user });
};
