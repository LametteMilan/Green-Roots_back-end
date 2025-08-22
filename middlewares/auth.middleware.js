import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
      //toutes les modification n'ayant pas été apporter je décode le token
      //  dans les headers et dans le cookie mais il devra être seulement stoker dans le cookie
      //  une fois terminer
      const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
      console.log("Token reçu:", token);
  
      if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token décodé:", decoded); 
  
      const user = await User.findByPk(decoded.userId);
      console.log("Utilisateur trouvé:", user ? user.get() : null); 
  
      if (!user) {
        console.log("Échec: userId du token ne correspond à aucun utilisateur");
        return res.status(401).json({ error: 'Utilisateur introuvable' });
      }
  
      req.userId = user.id_user;
      req.userRole = user.user_role;
      console.log("Rôle de l'utilisateur:", req.userRole); 
      next();
    } catch (error) {
      console.error("Erreur dans authMiddleware:", error);
      res.status(401).json({ error: 'Token invalide' });
    }
  };

export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        error: `Accès refusé. Rôle requis: ${allowedRoles.join(', ')}`,
        votre_role: req.userRole
      });
    }
    next();
  };
};