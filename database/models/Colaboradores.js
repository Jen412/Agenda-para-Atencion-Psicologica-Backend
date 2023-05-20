import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Citas } from "./Citas.js";

export const Colaborador = sequelize.define("Colaborador",{
    idColab: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {timestamps: false});

Citas.hasMany(Colaborador, {
    foreignKey: "idCita",
    sourceKey: "idCita"
});

Colaborador.belongsTo(Citas, {
    foreignKey: "idCita", 
    targetId: "idCita"
});