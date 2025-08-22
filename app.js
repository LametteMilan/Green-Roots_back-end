import express from "express";
import { router } from "./routers/index.router.js";
import cors from "cors";
import "./models/index.js";
import helmet from "helmet";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import { unless } from "express-unless";

const app = express();

// -------------- Middlewares globaux ----------------

// Sécurisation headers HTTP
app.use(helmet({ contentSecurityPolicy: false }));

// Nettoyage des entrées pour éviter XSS
app.use(xss());

// Parse les cookies pour que csurf puisse stocker le token dans le cookie
app.use(cookieParser());

// Activer CORS avec les credentials (cookies)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Parse les données POST JSON et URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Initialisation du middleware csurf pour stocker le token dans un cookie httpOnly
const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    }
});

csrfProtection.unless = unless;

app.use(
  csrfProtection.unless({
    path: [
      { url: '/sessions', methods: ['POST', 'DELETE', 'GET'] },
      '/csrf-token'
    ]
  })
);

// Exclure la protection CSRF sur login / logout, important car ce sont des routes d’authentification
// On a créer un router pour que ces routes sois sans défense CSRF
app.post('/sessions', router);
app.delete('/sessions', router);
app.get('/sessions/verify', router);

// Endpoint spécial pour fournir le token CSRF au front (à appeler après login par exemple)
app.get('/csrf-token', csrfProtection, (req, res) => {
    // Renvoie le token CSRF au front (à inclure dans les headers X-CSRF-Token des requêtes suivantes)
    res.json({ csrfToken: req.csrfToken() });
});

// Applique la protection CSRF sur les routes restantes
app.use(csrfProtection); 
app.use(router); 

app.use('/public', express.static('public'));

// Gestion des erreurs Sequelize (conflits)
app.use((err, req, res, next) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: "Cet email est déjà utilisé." });
    }
    if (err.code === 'EBADCSRFTOKEN') {
      // Erreur token CSRF invalide ou manquant
      return res.status(403).json({ error: "Session expirée ou requête non autorisée." });
    }
    // Autres erreurs
    res.status(500).json({ error: "Erreur serveur." });
});

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
