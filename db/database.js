import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export const sequelize = new Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USER}`, '', {
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql'
});