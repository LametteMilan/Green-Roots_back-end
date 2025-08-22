import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";

export class ProductCart extends Model {}

ProductCart.init(
  {
    id_cart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product_cart",
    timestamps: false,
  }
);
