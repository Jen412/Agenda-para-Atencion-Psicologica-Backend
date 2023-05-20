import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Personal = sequelize.define("Personal",{
    idPersonal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: true
    },
    apellidoP: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apellidoM: {
        type: DataTypes.STRING,
        allowNull: true
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
    },
    password: {
        type: DataTypes.STRING,
    }, 
    turno: {
        type: DataTypes.STRING,
    },
    confirmado:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tipoUsuario:{
        type: DataTypes.STRING
    }
}, {timestamps:false});