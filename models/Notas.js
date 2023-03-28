import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";

export const Notas = sequelize.define("Notas", {
    idNota: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    texto: {
        type: DataTypes.TEXT
    }
}, {timestamps: false});

