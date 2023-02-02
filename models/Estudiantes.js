import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";

export const Estudiantes = sequelize.define("Estudiantes",{
    numeroControl: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    apellidoP: {
        type: DataTypes.STRING
    },
    apellidoM: {
        type: DataTypes.STRING
    },
    turno: {
        type: DataTypes.STRING
    },
    sexo:{
        type: DataTypes.STRING
    }, 
    telefono:{
        type: DataTypes.INTEGER,
        allowNull: true
    }, 
    email: {
        type: DataTypes.STRING,
        unique: true,
    }
},{timestamps:false});
