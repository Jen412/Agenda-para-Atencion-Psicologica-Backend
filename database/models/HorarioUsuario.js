import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const HorarioUsuario = sequelize.define("HorarioUsuario",{
    idHorario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diaSemana:{
        type: DataTypes.STRING,
    },
    horaEntrada: {
        type: DataTypes.TIME 
    },
    horaSalida: {
        type: DataTypes.TIME 
    },
}, {timestamps:false});