import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Citas = sequelize.define("Citas",{
    idCita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    horaCita:{
        type: DataTypes.TIME
    },
    fechaCita: {
        type: DataTypes.DATE
    },
    fechaConfirmacion:{
        type: DataTypes.DATE,
        allowNull: true
    },
    motivo:{
        type: DataTypes.STRING
    },
    primeraCita: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fechaCancelacion:{
        type: DataTypes.DATE,
        allowNull: true
    },
    estudiante: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    observaciones: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },
    procesada:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    idPaciente:{
        type: DataTypes.INTEGER
    }
},{timestamps:false});
