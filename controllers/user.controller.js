import { User } from "../models/user.model.js";
import { ROLES } from "../constants/roles.js";
import bcrypt from "bcrypt";

export const userController = {
    async getAllUsers(req, res) {
        const users = await User.findAll();
        res.json(users);
    },

    async getOneUser(req, res) {
        const { id_user } = req.params;
        const user = await User.findByPk(id_user);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    },

    async createUser(req, res) {
        try {
            const userData = req.body;
            const { email, password, first_name, last_name } = userData;
            
            if (!email || !password || !first_name || !last_name) {
                return res.status(400).json({ error: "Tous les champs sont requis" });
            }
    
            if (password.length < 8) {
                return res.status(400).json({ error: "Le mot de passe doit faire au moins 8 caractères" });
            }
    
            userData.password = await bcrypt.hash(userData.password, 12);
            userData.user_role = userData.user_role || ROLES.CUSTOMER;
    
            const newUser = await User.create(userData);
            
            const { password: _, ...responseUser } = newUser.get();
            res.status(201).json(responseUser);
    
        } catch (error) {
            console.error('Detailed error:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: "Cet email est déjà utilisé" });
            }
            res.status(500).json({ error: error.message || "Erreur serveur" });
        }
    },
    
    async updateUser(req, res) {
        try {
            const { id_user } = req.params;
            const userData = req.body;
            
            // Ne pas mettre à jour le mot de passe si non fourni
            if (!userData.password) {
                delete userData.password;
            } else {
                if (userData.password.length < 8) {
                    return res.status(400).json({ error: "Mot de passe trop court" });
                }
                userData.password = await bcrypt.hash(userData.password, 12);
            }

            const [updated] = await User.update(userData, {
                where: { id_user },
            });

            if (updated) {
                const updatedUser = await User.findByPk(id_user, {
                    attributes: { exclude: ['password'] }
                });
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id_user } = req.params;
            const deleted = await User.destroy({
                where: { id_user },
            });

            if (deleted) {
                res.json({ success: `User with id ${id_user} deleted` });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};