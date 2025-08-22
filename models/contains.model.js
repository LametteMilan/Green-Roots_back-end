import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";

export class Contains extends Model {}

Contains.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "contains",
    timestamps: false,
  }
);
