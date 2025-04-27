require('dotenv').config();
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import NotesRouter from './routes/notesRoute';
import imageRoute from "./routes/imageRoute";

const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    'https://note-nest-frontend-oenzpjpxc-ashutoshs-projects-45093912.vercel.app',
    'http://localhost:5173', // Adjust to your frontend's actual port (e.g., 5173 for Vite)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Fixed typo
  optionsSuccessStatus: 200, // Fixed typo
  allowedHeaders: ['Content-Type', 'Authorization'],
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

// Setup middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use routes
app.use('/api/notes', NotesRouter);
app.use('/api/image', imageRoute);

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});