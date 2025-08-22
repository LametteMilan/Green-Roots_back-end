import { Bookmark } from "../bookmark.model.js";
import { Cart } from "../cart.model.js";
import { Contains } from "../contains.model.js";
import { Order } from "../order.model.js";
import { Product } from "../product.model.js";
import { ProductCart } from "../productCart.model.js";
import { Rating } from "../rating.model.js";
import { User } from "../user.model.js";



export const setupAssociations = () => {
  // User associations
  User.hasOne(Cart, { foreignKey: 'id_user' });
  User.hasMany(Order, { foreignKey: 'id_user' });
  User.belongsToMany(Product, { through: Rating, foreignKey: 'id_user', as: 'RatedProducts' });
  User.belongsToMany(Product, { through: Bookmark, foreignKey: 'id_user', as: 'BookmarkedProducts' });

  // Cart associations
  Cart.belongsTo(User, { foreignKey: 'id_user' });
  Cart.belongsToMany(Product, { through: ProductCart, foreignKey: 'id_cart', as: 'products' });

  // Order associations
  Order.belongsTo(User, { foreignKey: 'id_user' });
  Order.belongsToMany(Product, { through: Contains, foreignKey: 'id_order' });

  // Product associations
  Product.belongsToMany(User, { through: Rating, foreignKey: 'id_product', as: 'RatedProducts' });
  Product.belongsToMany(User, { through: Bookmark, foreignKey: 'id_product', as: 'BookmarkedProducts' });
  Product.belongsToMany(Cart, { through: ProductCart, foreignKey: 'id_product' });
  Product.belongsToMany(Order, { through: Contains, foreignKey: 'id_product' });
  Product.hasMany(Bookmark, { foreignKey: 'id_product' });

};