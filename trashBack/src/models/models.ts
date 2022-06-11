import sequelize from "../db";
import { DataTypes, Model } from "sequelize";
import { IUserRole } from "../interfaces";

interface UserAttributes {
  id?: number | null;
  tlgID: number;
  refreshToken: string;
  role: IUserRole;
  exp: number;
  name: string;
  createdAt: string;
  level: number;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  exp: number;
  id: number;
  tlgID: number;
  refreshToken: string;
  role: IUserRole;
  name: string;
  createdAt: string;
  level: number;
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
    createdAt: { type: DataTypes.DATE },
    level: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: "user",
  }
);
