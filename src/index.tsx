require(`dotenv`).config();
import express from "express"
import { errorHandler } from "./middleware/errorHandler";
import NotesRouter from './routes/notesRoute';
import authRoute from "./routes/authRoute"




const cloudinary = require('cloudinary').v2;


cloudinary.config({
    secure: true
  });

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use(express.json()); 



// use routes
app.use(`/api/notes`,NotesRouter)
app.use(`/api/auth`,authRoute)
app.use(`/api/image`,)

app.use(errorHandler)
