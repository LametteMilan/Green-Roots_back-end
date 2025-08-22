import { Rating } from "../models/rating.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

export const ratingController = {
    async getAllRatings(req, res) {
        const ratings = await Rating.findAll({
            include: [
                { model: User, attributes: ['id_user', 'first_name', 'last_name'] },
                { model: Product, attributes: ['id_product', 'product_name'] }
            ]
        });
        res.json(ratings);
    },

    async getOneRating(req, res) {
        const { id_user, id_product } = req.params;
        const rating = await Rating.findOne({
            where: { id_user, id_product },
            include: [
                { model: User, attributes: ['id_user', 'first_name', 'last_name'] },
                { model: Product, attributes: ['id_product', 'product_name'] }
            ]
        });
        if (rating) {
            res.json(rating);
        } else {
            res.status(404).json({ error: "Rating not found" });
        }
    },

    async createRating(req, res) {
        const { id_user, id_product, rating_note, rating_comment } = req.body;

        // Check if the product exists
        const product = await Product.findByPk(id_product);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the user exists
        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newRating = await Rating.create({
            id_user,
            id_product,
            rating_note,
            rating_comment,
            rating_created_at: new Date()
        });
        res.status(201).json(newRating);
    },

    async updateRating(req, res) {
        const { id_user, id_product } = req.params;
        const { rating_note, rating_comment } = req.body;
        const [updated] = await Rating.update({ rating_note, rating_comment }, {
            where: { id_user, id_product }
        });
        if (updated) {
            const updatedRating = await Rating.findOne({
                where: { id_user, id_product },
                include: [
                    { model: User, attributes: ['id_user', 'first_name', 'last_name'] },
                    { model: Product, attributes: ['id_product', 'product_name'] }
                ]
            });
            res.json(updatedRating);
        } else {
            res.status(404).json({ error: "Rating not found" });
        }
    },

    async deleteRating(req, res) {
        const { id_user, id_product } = req.params;
        const deleted = await Rating.destroy({
            where: { id_user, id_product }
        });
        if (deleted) {
            res.json({ success: `Rating for user ${id_user} and product ${id_product} deleted` });
        } else {
            res.status(404).json({ error: "Rating not found" });
        }
    },

    async getProductRatings(req, res) {
        const { id_product } = req.params;
        const ratings = await Rating.findAll({
            where: { id_product },
            include: [
                { model: User, attributes: ['id_user', 'first_name', 'last_name'] }
            ]
        });
        res.json(ratings);
    },

    async getUserRatings(req, res) {
        const { id_user } = req.params;
        const ratings = await Rating.findAll({
            where: { id_user },
            include: [
                { model: Product, attributes: ['id_product', 'product_name'] }
            ]
        });
        res.json(ratings);
    }
};
