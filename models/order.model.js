import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";

export class Order extends Model {}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // order_date: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    // updated_at: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    order_total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "table_order",
    timestamps: true,
    underscored: true,
  }
);
