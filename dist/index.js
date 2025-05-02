"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const notesRoute_1 = __importDefault(require("./routes/notesRoute"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
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
app.use(express_1.default.json());
app.use('/api/notes', notesRoute_1.default);
app.use('/api/image', uploadRoutes_1.default);
// Error handler
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
