"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const notesRoute_1 = __importDefault(require("./routes/notesRoute"));
const imageRoute_1 = __importDefault(require("./routes/imageRoute"));
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// CORS configuration
const corsOptions = {
    origin: [
        'https://note-nest-frontend-oenzpjpxc-ashutoshs-projects-45093912.vercel.app',
        'http://localhost:5173', // Adjust to match your frontend's port
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
// Log CORS headers in responses
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
// Parse JSON bodies
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/notes', notesRoute_1.default);
app.use('/api/image', imageRoute_1.default);
// Error handler
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
