import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";
import { Estudiantes } from "./Estudiantes.js";

export const Carreras = sequelize.define("Carreras",{
    idCarrera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCarrera:{
        type: DataTypes.STRING
    }
}, {timestamps:false});

Carreras.hasOne(Estudiantes,{
    foreignKey: "idCarrera", 
    sourceKey: "idCarrera"
});

Estudiantes.belongsTo(Carreras,{
    foreignKey: "idCarrera", 
    targetKey: "idCarrera"
});