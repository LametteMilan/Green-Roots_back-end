import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";

export class Bookmark extends Model {}

Bookmark.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "bookmarks",
    timestamps: false,
  }
);