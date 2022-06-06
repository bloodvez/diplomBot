import sequelize from "../db";
import { DataTypes, Model } from "sequelize";

interface UserAttributes {
  id?: number | null;
  tlgID: number;
  refreshToken: string;
  role: IUserRole;
  exp: number;
  name: string;
  createdAt: string;
}

export type IUserRole = "USER" | "ADMIN";

export class User extends Model<UserAttributes> implements UserAttributes {
  exp!: number;
  id!: number;
  tlgID!: number;
  refreshToken!: string;
  role!: IUserRole;
  name!: string;
  createdAt: string;
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
    name: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "user",
  }
);
