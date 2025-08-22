import { ProductCart } from "../models/productCart.model.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";

export const productCartController = {
    async getAllProductCarts(req, res) {
        try {
            console.log('fonction getAllProducts');
            
            const productCarts = await ProductCart.findAll();
            res.json(productCarts);
        } catch (error) {
            console.error("Error in findAll:", error);
            res.status(402).json({ error });
        }
    },

    async getOneProductCart(req, res) {
        const { id_cart, id_product } = req.params;
        const productCart = await ProductCart.findOne({
            where: { id_cart, id_product }
        });
        if (productCart) {
            res.json(productCart);
        } else {
            res.status(404).json({ error: "ProductCart not found" });
        }
    },

    async createProductCart(req, res) {
        try {
          const { id_cart, id_product, product_quantity } = req.body;
      
          // Vérifie que le produit existe
          const product = await Product.findByPk(id_product);
          if (!product) {
            return res.status(404).json({ error: "Product not found" });
          }
      
          // Vérifie que le panier existe
          const cart = await Cart.findByPk(id_cart);
          if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
          }
      
          // Vérifie si le produit est déjà dans le panier
          const existingEntry = await ProductCart.findOne({
            where: { id_cart, id_product },
          });
      
          if (existingEntry) {
            // Si déjà présent, mettre à jour la quantité
            // existingEntry.product_quantity += product_quantity;
            // await existingEntry.save();
            return res.status(200).json('produit déjà dans le panier');
          }
      
          // Sinon, on crée un lien
          const newProductCart = await ProductCart.create({
            id_cart,
            id_product,
            product_quantity,
          });
      
          res.status(201).json(newProductCart);
      
        } catch (error) {
          console.error("Error in createProductCart:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      },

    async updateProductCart(req, res) {
        const { id_cart, id_product } = req.params;
        const { product_quantity } = req.body;
        const [updated] = await ProductCart.update({ product_quantity }, {
            where: { id_cart, id_product }
        });
        if (updated) {
            const updatedProductCart = await ProductCart.findOne({
                where: { id_cart, id_product }
            });
            res.json(updatedProductCart);
        } else {
            res.status(404).json({ error: "ProductCart not found" });
        }
    },

    async deleteProductCart(req, res) {
        const { id_cart, id_product } = req.params;
        const deleted = await ProductCart.destroy({
            where: { id_cart, id_product }
        });
        if (deleted) {
            res.json({ success: `ProductCart with id_cart ${id_cart} and id_product ${id_product} deleted` });
        } else {
            res.status(404).json({ error: "ProductCart not found" });
        }
    },

    async getCartProducts(req, res) {
        const { id_cart } = req.params;
        const cartProducts = await ProductCart.findAll({
            where: { id_cart }
        });
        res.json(cartProducts);
    }
};
