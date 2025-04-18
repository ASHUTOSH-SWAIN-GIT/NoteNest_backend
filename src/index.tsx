require(`dotenv`).config();
import express from "express"
import { errorHandler } from "./middleware/errorHandler";
import NotesRouter from './routes/notesRoute';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use(express.json()); // ⬅️ Add this



// use routes
app.use(`/api/notes`,NotesRouter)

app.use(errorHandler)
