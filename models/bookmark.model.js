import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";

export class Bookmark extends Model {}

Bookmark.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id_product'
      }
    }
  },
  {
    sequelize,
    tableName: "bookmarks",
    timestamps: false,
    underscored: true
  }
);
