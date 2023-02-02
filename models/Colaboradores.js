import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";

export const Citas = sequelize.define("Cita",{
    idColab: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
});