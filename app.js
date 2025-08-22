import express from "express";
import { router } from "./routers/index.router.js";
import cors from "cors";
import "./models/index.js"


const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}
));

app.use(express.json());
app.use(router);
app.use('/public', express.static('public'));

app.use((err, req, res, next) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: "Cet email est déjà utilisé." });
    }
    res.status(500).json({ error: "Erreur serveur." });
});

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
