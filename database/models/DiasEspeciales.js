import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const DiasEspeciales = sequelize.define("DiasEspeciales",{
    idDia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaDia: {
        type: DataTypes.DATE
    },
    descripcion: {
        type: DataTypes.STRING
    }  
}, {timestamps: false});