import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";

export class Cart extends Model {}

Cart.init(
  {
    id_cart: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "cart",
    timestamps: true,
    underscored: true
  }
);
