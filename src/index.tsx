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
    'http://localhost:5173', // Local frontend (adjust if different, e.g., 3000, 3001)
    'https://note-nest-frontend-oenzpjpxc-ashutoshs-projects-45093912.vercel.app', // Deployed frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  console.log('Request Origin:', req.get('Origin'));
  next();
});

// Apply CORS middleware
app.use(cors(corsOptions));

// Log response headers for debugging
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Response Headers:', res.getHeaders());
  });
  next();
});

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