import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";
import {Citas} from "./Citas.js";
import { HorarioUsuario } from "./HorarioUsuario.js";
import { Colaborador } from "./Colaboradores.js";

export const Usuario = sequelize.define("Usuario",{
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    tipoUsuario: {
        type: DataTypes.STRING
    },
    turno: {
        type: DataTypes.STRING
    }
}, {timestamps:false});

Usuario.hasMany(Citas, {
    foreignKey: "idUsuario",
    sourceKey: "idUsuario"
});

Citas.belongsTo(Usuario,{
    foreignKey: "idUsuario",
    targetId: "idUsuario"
});

Usuario.hasMany(HorarioUsuario,{
    foreignKey: "idUsuario",
    sourceKey: "idUsuario"
});

HorarioUsuario.belongsTo(Usuario,{
    foreignKey: "idUsuario",
    targetId: "idUsuario"
});

Usuario.hasMany(Colaborador, {
    foreignKey: "idUsuario",
    sourceKey: "idUsuario"
});

Colaborador.belongsTo(Usuario, {
    foreignKey: "idUsuario", 
    targetId: "idUsuario"
});