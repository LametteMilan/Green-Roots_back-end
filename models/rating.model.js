import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";

export class Rating extends Model {}

Rating.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    rating_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating_note: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating_comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "rating",
    timestamps: false,
  }
);
