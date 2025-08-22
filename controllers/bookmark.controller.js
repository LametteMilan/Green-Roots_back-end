import { Bookmark } from "../models/bookmark.model.js";
import { Product } from "../models/product.model.js";
import { User } from '../models/user.model.js';

export const bookmarkController = {
    async getAllBookmarks(req, res) {
        const bookmarks = await Bookmark.findAll({ include: 'products' });
        res.json(bookmarks);
    },

    async createBookmark(req, res) {
        const { id_user, products } = req.body;
        const newBookmark = await Bookmark.create({ id_user });
        await newBookmark.setProducts(products);
        res.json(newBookmark);
    },

    async updateBookmark(req, res) {
        const { id_user } = req.params;
        const { products } = req.body;
        const bookmark = await Bookmark.findByPk(id_user);
        await bookmark.setProducts(products);
        res.json({ success: `Bookmark for user ${id_user} updated` });
    },

    async deleteBookmark(req, res) {
        const { id_user } = req.params;
        await Bookmark.destroy({ where: { id_user } });
        res.json({ success: `Bookmark for user ${id_user} deleted` });
    },

    async addProductToBookmark(req, res) {
      try {
        const { id_user, id_product } = req.params;
    
        const user = await User.findByPk(id_user);
        const product = await Product.findByPk(id_product);
    
        if (!user || !product) {
          return res.status(404).json({ error: "User or product not found" });
        }
    
        await user.addBookmarkedProduct(product);
        return res.json(product);
      } catch (err) {
        console.error('Error adding product to bookmark:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    },

    async removeProductFromBookmark(req, res) {
      try {
        const { id_user, id_product } = req.params;
    
        // Vérification de l'existence du user
        const user = await User.findByPk(id_user);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Vérification de l'existence du produit
        const product = await Product.findByPk(id_product);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        // Suppression de la relation dans la table pivot 'bookmarks'
        const result = await Bookmark.destroy({
          where: {
            id_user, // correspond à l'ID de l'utilisateur
            id_product, // correspond à l'ID du produit
          },
        });
    
        // Si aucune ligne n'a été supprimée, renvoie une erreur
        if (result === 0) {
          return res.status(404).json({ error: 'Bookmark not found' });
        }
    
        // Si la suppression est réussie, renvoie une réponse
        return res.json({ success: `Product removed from bookmark for user ${id_user}` });
      } catch (err) {
        console.error('Error removing product from bookmark:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    },

    async getBookmarkProducts(req, res) {
        try {
          const { id_user } = req.params;
      
          // Récupérer les produits associés à cet utilisateur via la table `Bookmark`
          const products = await Product.findAll({
            include: [{
              model: Bookmark,
              where: { id_user },
              attributes: [] // On exclut les colonnes de la table de jointure
            }],
            attributes: ['id_product', 'product_name', 'product_description', 
                        'product_price', 'product_localisation', 'image_product']
          });
      
          return res.json(products);
          
        } catch (err) {
          console.error('Error fetching bookmark products:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
};
