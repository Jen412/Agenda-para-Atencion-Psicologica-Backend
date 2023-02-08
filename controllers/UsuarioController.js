import { Usuario } from "../models/Usuarios.js";
import { HorarioUsuario } from "../models/HorarioUsuario.js";

import bcrypt from "bcrypt";

const obtenerUsuarios = async (req, res) =>{
    const usuarios = await Usuario.findAll();
    return res.json(usuarios);
}

const obtenerUsuario = async (req, res) =>{
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            const error = new Error("Usuario no Econtrado");
            return res.status(404).json({mensaje: error.message});
        }
        return res.json(usuario);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:21 ~ obtenerUsuario ~ error", error)
    }
}

const agregarUsusario = async (req, res)=>{
    const {email, password, tipoUsuario} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let newPasword = bcrypt.hashSync(password, salt);
    try {
        const newUser = await Usuario.create({email, password:newPasword, tipoUsuario});
        return res.json(newUser);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:24 ~ agregarUsusario ~ error", error)
    }
}

const modificarUsuario = async (req, res) =>{
    const {id} = req.params;
    try {
        const usuario =  await Usuario.findByPk(id);
        if (!usuario) {
            const error = new Error("Usuario no Econtrado");
            return res.status(404).json({mensaje: error.message});
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        let newPasword = bcrypt.hashSync(usuario.password, salt);

        usuario.email = req.body.email || usuario.email;
        usuario.password = newPasword
        usuario.tipoUsuario = req.body.tipoUsuario || usuario.tipoUsuario;
        const usuarioActualizado = await usuario.save();
        return res.json(usuarioActualizado);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:40 ~ modificarUsuario ~ error", error)
    }
}

const eliminarUsuario = async (req, res) =>{
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            const error = new Error("Usuario no Econtrado");
            return res.status(404).json({mensaje: error.message});
        }
        await Usuario.destroy({
            where:{
                idUsuario: id
            }
        });
        res.json({mensaje:"Usuario Eliminado Corectamente"});
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:47 ~ eliminarUsuario ~ error", error)
    }
}

const agregarHorarioUsuario = async (req, res) => {
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            const error = new Error("Usuario no Econtrado");
            return res.status(404).json({mensaje: error.message});
        }
    const horario = req.body;
        const newHorario = await HorarioUsuario.create(horario);
        return res.json(newHorario);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:87 ~ agregarHorarioUsuario ~ error", error)
    }
}

const obtenerHorariosUsuario = async (req, res) => {
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            const error = new Error("Usuario no Econtrado");
            return res.status(404).json({mensaje: error.message});
        }
        const horarios = await HorarioUsuario.findAll({
            where: {
                idUsuario: id
            }
        });
        return res.json(horarios);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:106 ~ obtenerHorariosUsuario ~ error", error)
    }
}

const obtenerHorarioUsuario = async (req, res) => {
    const {idUsuario, idHorario} = req.params;
    try {
        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) {
            const error = new Error("Usuario no Econtrado");
            return res.status(404).json({mensaje: error.message});
        }
        const horario =await HorarioUsuario.findOne({
            where: {
                idHorario : idHorario, 
                idUsuario: idUsuario
            }
        });
        return res.json(horario);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:126 ~ obtenerHorarioUsuario ~ error", error)
    }
}

const modificarHorarioUsuario = async (req, res) => {
    const {idUsuario, idHorario} = req.params;
    try {
        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) {
            const error = new Error("Usuario no Econtrado");
            return res.status(404).json({mensaje: error.message});
        }
        const horario =await HorarioUsuario.findOne({
            where: {
                idHorario : idHorario, 
                idUsuario: idUsuario
            }
        });
        horario.diaSemana = req.body.diaSemana || horario.diaSemana;
        horario.horaEntrada = req.body.horaEntrada || horario.horaEntrada;
        horario.horaSalida = req.body.horaSalida || horario.horaSalida;
        const horarioActualizado = await horario.save();
        return res.json(horarioActualizado);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:150 ~ modificarHorarioUsuario ~ error", error)
    }
}

const eliminarHorarioUsuario = async (req, res) => {
    const {idUsuario, idHorario} = req.params;
    try {
        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) {
            const error = new Error("Usuario no Econtrado");
            return res.status(404).json({mensaje: error.message});
        }
        const horario =await HorarioUsuario.findOne({
            where: {
                idHorario : idHorario, 
                idUsuario: idUsuario
            }
        });
        await horario.destroy({
            where: {
                idHorario : idHorario
            }
        });
        return res.json({mensaje: "Horario Eliminado"});
    } catch (error) {
    }
}


export{
    obtenerUsuarios,
    agregarUsusario,
    modificarUsuario,
    eliminarUsuario,
    obtenerUsuario,
    agregarHorarioUsuario,
    obtenerHorariosUsuario,
    obtenerHorarioUsuario,
    modificarHorarioUsuario,
    eliminarHorarioUsuario
}