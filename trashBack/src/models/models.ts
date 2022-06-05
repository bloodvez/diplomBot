import sequelize from "../db";
import { DataTypes, Model } from "sequelize";

interface UserAttributes {
  id?: number | null;
  tlgID: number;
  refreshToken: string;
  role: string | null;
  exp: number;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  exp: number;
  id!: number;
  tlgID!: number;
  refreshToken!: string;
  role!: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    tlgID: { type: DataTypes.INTEGER, unique: true },
    refreshToken: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    exp: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: "user",
  }
);
