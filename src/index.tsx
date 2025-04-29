require('dotenv').config();
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import NotesRouter from './routes/notesRoute';
import imageRoute from "./routes/imageRoute";

const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://note-nest-frontend-oenzpjpxc-ashutoshs-projects-45093912.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Optional: Handle preflight requests explicitly (if needed)
app.options('*', cors(corsOptions));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

// Parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/notes', NotesRouter);
app.use('/api/image', imageRoute);

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
