require(`dotenv`).config();
import express from "express"
import { errorHandler } from "./middleware/errorHandler";
import NotesRouter from './routes/notesRoute';
// import authRoute from "./routes/authRoute"
import imageRoute from "./routes/imageRoute"


const cloudinary = require('cloudinary').v2;
const cors = require(`cors`)
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: ['https://note-nest-frontend-oenzpjpxc-ashutoshs-projects-45093912.vercel.app/','http://localhost:3000'], // Replace with your frontend URL
    methods: ['GET', 'POST'],         // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
};




cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});





app.use(cors(corsOptions))
app.get('/', (req: any, res: any) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use(express.json());



// use routes
app.use(`/api/notes`, NotesRouter)
// app.use(`/api/auth`, authRoute)
app.use(`/api/image`, imageRoute)

app.use(errorHandler)
