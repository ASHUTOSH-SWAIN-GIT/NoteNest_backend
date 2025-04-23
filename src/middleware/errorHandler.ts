// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Caught by error handler:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
};
