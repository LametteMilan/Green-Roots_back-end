import multer from 'multer';
import path from 'node:path';

// Configuration de multer pour spécifier où stocker les images importées lors de la création d'un nouveau produit
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');  // Le dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Générer un nom unique pour chaque fichier
  }
});

// Créer un objet multer avec la configuration définie
const upload = multer({ storage });

export { upload };
