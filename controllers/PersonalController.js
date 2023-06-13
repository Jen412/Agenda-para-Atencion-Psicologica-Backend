import {  Personal} from "../database/models/Personal.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

const obtenerPersonalCompleto = async (req, res) =>{ 
    const estudiante = await Personal.findAll();
    return res.json(estudiante);
}

const obtenerPersonal = async (req, res) =>{
    const {id} = req.params;
    const personal = await Personal.findByPk(id);
    if (!personal) {
        const error = new Error("Persona no Econtrado");
        return res.status(404).json({mensaje: error.message});
    }
    return res.json(personal);
}

const agregarPersonal = async (req, res)=>{
    const personal = req.body;
    const {password} = req.body;
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        let newPasword = await bcrypt.hashSync(password, salt);
        personal.password=newPasword;
        const newPersonal = await Personal.create(personal);
        return res.json(newPersonal);
    } catch (error) {
        console.log("🚀 ~ file: PersonalController.js:24 ~ agregarPersonal ~ error", error)
    }
} 

const modificarPersonal = async (req, res) =>{
    const {id} = req.params;
    const personal =  await Personal.findByPk(id);
    if (!personal) {
        const error = new Error("Persona no Econtrado");
        return res.status(404).json({mensaje: error.message});
    }
    personal.nombre = req.body.nombre || personal.nombre;
    personal.apellidoP = req.body.apellidoP || personal.apellidoP;
    personal.apellidoM = req.body.apellidoM || personal.apellidoM;
    personal.sexo = req.body.sexo || personal.sexo;
    personal.telefono = req.body.telefono || personal.telefono;
    personal.password = req.body.password || personal.password;
    personal.email = req.body.email || personal.email;
    try {
        const personalActualizado = await personal.save();
        return res.json(personalActualizado);
    } catch (error) {
        console.log("🚀 ~ file: PersonalController.js:47 ~ modificarPersonal ~ error", error)
    }
}

const eliminarPersonal = async (req, res) =>{
    const {id} = req.params;
    const personal = await Personal.findByPk(id);
    if (!personal) {
        const error = new Error("Persona no Econtrado");     
        return res.status(404).json({mensaje: error.message});
    }
    try {
        await personal.destroy({
            where:{
                idPersonal: id
            }
        });
        res.json({mensaje:"Persona Eliminada Corectamente"});
    } catch (error) {
        console.log("🚀 ~ file: PersonalController.js:66 ~ eliminarPersonal ~ error", error)
    }
}

export{
    obtenerPersonalCompleto,
    agregarPersonal,
    modificarPersonal,
    eliminarPersonal,
    obtenerPersonal
}