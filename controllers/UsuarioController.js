import { Usuario } from "../models/Usuarios.js";
import bcrypt from "bcrypt";

const obtenerUsuarios = async (req, res) =>{
    const usuarios = await Usuario.findAll();
    return res.json(usuarios);
}

const obtenerUsuario = async (req, res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        const error = new Error("Usuario no Econtrado");
        return res.status(404).json({mensaje: error.message});
    }
    return res.json(usuario);
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
    try {
        const usuarioActualizado = await usuario.save();
        return res.json(usuarioActualizado);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:40 ~ modificarUsuario ~ error", error)
    }
}

const eliminarUsuario = async (req, res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        const error = new Error("Usuario no Econtrado");
        return res.status(404).json({mensaje: error.message});
    }
    try {
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


export{
    obtenerUsuarios,
    agregarUsusario,
    modificarUsuario,
    eliminarUsuario,
    obtenerUsuario
}