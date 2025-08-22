import { Cart } from "../models/cart.model.js";
import { ProductCart } from "../models/productCart.model.js";
import { Product } from "../models/product.model.js";

export const cartController = {
    // async getAllCarts(req, res) {
    //     const carts = await Cart.findAll({ include: 'products' });
    //     res.json(carts);
    // },

    async getOneCart(req, res) {
        try {
            const userId = req.userId; // req.user est défini par authMiddleware
            console.log("id d el'utilistauer ", userId);

            let cart = await Cart.findOne({
              where: { id_user: userId },
              include: ['products'],
            });
        
            // Si le panier n'existe pas, on le crée
            if (!cart) {
              console.log('pas de panier pour cet utilisateur');
              cart = await Cart.create({ id_user: userId });
            }
        
            return res.json(cart);
          } catch (err) {
            console.error('Error getting user cart:', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération du panier' });
          }
        },

    async createCart(req, res) {
        const cartData = req.body;
        const newCart = await Cart.create(cartData);
        res.status(201).json(newCart);
    },

    async updateCart(req, res) {
        const { id_cart } = req.params;
        const cartData = req.body;
        const [updated] = await Cart.update(cartData, {
            where: { id_cart },
        });
        if (updated) {
            const updatedCart = await Cart.findByPk(id_cart, { include: 'products' });
            res.json(updatedCart);
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    },

    async deleteCart(req, res) {
        const { id_cart } = req.params;
        const deleted = await Cart.destroy({
            where: { id_cart },
        });
        if (deleted) {
            res.json({ success: `Cart with id ${id_cart} deleted` });
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    },

    async addProductToCart(req, res) {
        try {
            const { id_cart } = req.params;
        const { id_product, product_quantity } = req.body;

        // Check if the product exists
        const product = await Product.findByPk(id_product);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const newProductCart = await ProductCart.create({ id_cart, id_product, product_quantity });
        return res.status(201).json(newProductCart);
        } catch (error) {
            console.error('Error adding product to cart:', err);
            return res.status(401).json({ error: 'cart error' });
        }
        
    },

    async removeProductFromCart(req, res) {
        const { id_cart, id_product } = req.params;
        const deleted = await ProductCart.destroy({
            where: { id_cart, id_product }
        });
        if (deleted) {
            res.json({ success: `Product with id ${id_product} removed from cart with id ${id_cart}` });
        } else {
            res.status(404).json({ error: "ProductCart not found" });
        }
    },

    async updateProductInCart(req, res) {
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

    async getCartProducts(req, res) {
        const { id_cart } = req.params;
        const cartProducts = await ProductCart.findAll({
            where: { id_cart },
            include: Product
        });
        res.json(cartProducts);
    }
};
