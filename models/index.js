import { User } from './user.model.js';
import { Cart } from './cart.model.js';
import { Order } from './order.model.js';
import { Product } from './product.model.js';
import { ProductCart } from './productCart.model.js';
import { Rating } from './rating.model.js';
import { Bookmark } from './bookmark.model.js';
import { Contains } from './contains.model.js';
import { setupAssociations } from './config/associations.js';
import { sequelize } from './config/client.js';

console.log("Le fichier index.js a été exécuté !");
// Initialize models
export { User, Cart, Order, Product, ProductCart, Rating, Bookmark, Contains };

// Setup associations
setupAssociations();

// await sequelize.sync();
// console.log('test', Object.keys(user.__proto__));
