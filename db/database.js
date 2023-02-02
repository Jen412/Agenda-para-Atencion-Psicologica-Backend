import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('agendaCitas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});