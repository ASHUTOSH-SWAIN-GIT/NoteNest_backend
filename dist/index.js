"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require(`dotenv`).config();
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const notesRoute_1 = __importDefault(require("./routes/notesRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const imageRoute_1 = __importDefault(require("./routes/imageRoute"));
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
app.use(express_1.default.json());
// use routes
app.use(`/api/notes`, notesRoute_1.default);
app.use(`/api/auth`, authRoute_1.default);
app.use(`/api/image`, imageRoute_1.default);
app.use(errorHandler_1.errorHandler);
