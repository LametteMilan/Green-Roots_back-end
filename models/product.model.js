import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";
import { Bookmark } from "./bookmark.model.js";

export class Product extends Model {}

Product.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    product_localisation: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image_product: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product",
    timestamps: true,
    underscored: true
  }
);
