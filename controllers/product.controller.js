import { Product } from "../models/product.model.js";

export const productController = {
    async getAllProducts(req, res) {
        const products = await Product.findAll();
        res.json(products);
    },

    async getOneProduct(req, res) {
        const { id_product } = req.params;
        const product = await Product.findByPk(id_product);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    },

    async createProduct(req, res) {
        console.log(req.body);
        
        // const productData = req.body;
        // const newProduct = await Product.create(productData);
        // res.status(201).json(newProduct);

        // Vérifier si le fichier image est bien téléchargé
        const { file } = req;

        if (!file) {
        return res.status(400).json({ error: 'Aucune image fournie' });
        }

        try {
        const { product_name, product_description, product_price, product_localisation } = req.body;

        // Vérification supplémentaire
        console.log('Données avant création :', { product_name, product_description, product_price, product_localisation });

        if (!product_name || !product_localisation || !product_description || !product_price) {
        return res.status(400).json({ error: 'Tous les champs requis doivent être remplis.' });
        }
        // Préparer les données du produit, incluant le chemin du fichier
        const productData = {
            product_name: product_name,
            product_description: product_description,
            product_price: Number.parseFloat(product_price),
            product_localisation: product_localisation,
            image_product: file.filename,  // On sauvegarde le nom du fichier
        };

        // Créer le produit dans la base de données
        const newProduct = await Product.create(productData);

        // Répondre avec le produit créé
        res.status(201).json(newProduct);
        } catch (error) {
        console.error('Erreur lors de la création du produit :', error);
        res.status(500).json({ error: error.message || 'Erreur serveur' });
        }
    },

    async updateProduct(req, res) {
      try {
        const { id_product } = req.params;
    
        const product = await Product.findByPk(id_product);
        if (!product) {
          return res.status(404).json({ error: "Produit non trouvé" });
        }
    
        // Extraire les champs du corps de la requête
        const {
          product_name,
          product_price,
          product_description,
          product_localisation,
        } = req.body;
    
        // Gérer l'image si elle a été modifiée
        const image_product = req.file
          ? req.file.path.replace(/^public[/]/, '')
          : product.image_product;
    
        // Mettre à jour
        await product.update({
          product_name,
          product_price,
          product_description,
          product_localisation,
          image_product,
        });
    
        const updatedProduct = await Product.findByPk(id_product);
        res.json(updatedProduct);
    
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
      }
    },
      
    async deleteProduct(req, res) {
        const { id_product } = req.params;
        const deleted = await Product.destroy({
            where: { id_product },
        });
        if (deleted) {
            res.json({ success: `Product with id ${id_product} deleted` });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    }
};
