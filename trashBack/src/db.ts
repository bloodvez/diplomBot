import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // ПАРОЛЬ
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
  }
);

export default sequelize;
