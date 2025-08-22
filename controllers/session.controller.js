import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const sessionController = {
    create: async (req, res) => {
      const { email, password } = req.body;
      console.log("Tentative de connexion avec:", email);
  
      try {
        const user = await User.findOne({ where: { email } });
        console.log("Utilisateur trouvé:", user ? user.id_user : "NULL"); 
  
        if (!user) {
          console.log("Échec: Email non trouvé"); 
          return res.status(401).json({ error: 'Identifiants invalides' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Résultat de bcrypt.compare:", isMatch); 
  
        if (!isMatch) {
          console.log("Échec: Mot de passe incorrect"); 
          return res.status(401).json({ error: 'Identifiants invalides' });
        }
  
        const token = jwt.sign(
          { userId: user.id_user, role: user.user_role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );
        console.log("Token généré:", token); 
  
        res.cookie('token', token, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600000
        });
  
        res.json({
          userId: user.id_user,
          role: user.user_role,
          token
        });
  
      } catch (error) {
        console.error("Erreur complète dans sessionController:", error); 
        res.status(500).json({ error: error.message || 'Erreur serveur' });
      }
    },

  destroy: (req, res) => {
    res.clearCookie('token');
    res.status(204).end();
  },

  verify: (req, res) => {
    res.json({
      userId: req.userId,
      isAuthenticated: true
    });
  }
};