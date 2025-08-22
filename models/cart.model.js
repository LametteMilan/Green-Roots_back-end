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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Un utilisateur ne peut avoir qu’un seul panier
      references: {
        model: "users",  
        key: "id_user",
      }
    }
  },
  {
    sequelize,
    tableName: "cart",      // nom exact de la table SQL
    timestamps: false,      // car tu fournis explicitement created_at et updated_at
    underscored: true       
  }
);
