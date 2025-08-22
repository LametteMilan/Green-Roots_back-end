import { Model, DataTypes } from "sequelize";
import { sequelize } from "./config/client.js";
import { Bookmark } from "./bookmark.model.js";

export class User extends Model {}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
      isIn: [['admin', 'manager', 'customer']]
      }
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    underscored: true
  },
);

 User.hasMany(Bookmark, { foreignKey: 'id_user' });
 Bookmark.belongsTo(User, { foreignKey: 'id_user' });
