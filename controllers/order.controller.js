import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

export const orderController = {
    async getAllOrders(req, res) {
        const orders = await Order.findAll({
            include: {
                model: User,
                attributes: ['id_user', 'first_name', 'last_name', 'email']
            }
        });
        res.json(orders);
    },

    async getOneOrder(req, res) {
        const { id_order } = req.params;
        const order = await Order.findByPk(id_order, {
            include: {
                model: User,
                attributes: ['id_user', 'first_name', 'last_name', 'email']
            }
        });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    },

    async createOrder(req, res) {
        try {
            const orderData = req.body;

        // Check if the user exists
        const user = await User.findByPk(orderData.id_user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newOrder = await Order.create(orderData);
        return res.status(201).json(newOrder);
            
        } catch (error) {
            console.error('Error creating order:', error);
            return res.status(400).json({ error: 'Erreur lors de la création de la commande' });
            
        }
        
    },

    async updateOrder(req, res) {
        const { id_order } = req.params;
        const orderData = req.body;
        const [updated] = await Order.update(orderData, {
            where: { id_order },
        });
        if (updated) {
            const updatedOrder = await Order.findByPk(id_order, {
                include: {
                    model: User,
                    attributes: ['id_user', 'first_name', 'last_name', 'email']
                }
            });
            res.json(updatedOrder);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    },

    async deleteOrder(req, res) {
        const { id_order } = req.params;
        const deleted = await Order.destroy({
            where: { id_order },
        });
        if (deleted) {
            res.json({ success: `Order with id ${id_order} deleted` });
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    },

    async getUserOrders(req, res) {
        const { id_user } = req.params;
        const orders = await Order.findAll({
            where: { id_user },
            include: {
                model: User,
                attributes: ['id_user', 'first_name', 'last_name', 'email']
            }
        });
        res.json(orders);
    }
};
