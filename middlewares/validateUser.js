export const validateUser = (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Email invalide." });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." });
    }

    next();
};
export const validateUserUpdate = (req, res, next) => {
    const { email, password } = req.body;
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email invalide." });
    }
    
    if (password && password.length < 8) {
        return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." });
    }
    
    next();
};