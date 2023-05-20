import { Usuario } from "../database/models/Usuarios.js";
import { Estudiantes } from "../database/models/Estudiantes.js";
import { Personal } from "../database/models/Personal.js";
import { HorarioUsuario } from "../database/models/HorarioUsuario.js";
import generarJWT from "../helpers/generarJWT.js";
import bcrypt from "bcrypt";

const obtenerUsuarios = async (req, res) =>{
    try {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:13 ~ obtenerUsuarios ~ error:", error)
    }
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
    const {email, password, tipoUsuario,nombre, apellidoP, apellidoM, turno} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let newPasword = bcrypt.hashSync(password, salt);
    try {
        const newUser = await Usuario.create({email, password:newPasword, tipoUsuario, nombre, apellidoP, apellidoM, turno});
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
        let newPasword = usuario.password;
        if (req.body?.password != undefined || req.body?.password != null) {
            const salt = await bcrypt.genSalt(10);
            newPasword =await bcrypt.hash(usuario.password, salt);
        }
        usuario.email = req.body.email || usuario.email;
        usuario.password = newPasword
        usuario.tipoUsuario = req.body.tipoUsuario || usuario.tipoUsuario;
        usuario.turno = req.body.turno || usuario.turno;
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.apellidoP = req.body.apellidoP || usuario.apellidoP;
        usuario.apellidoM = req.body.apellidoM || usuario.apellidoM;
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
        console.log("🚀 ~ file: UsuarioController.js:178 ~ eliminarHorarioUsuario ~ error", error)
    }
}

const comprobarPassword = async (password, passwordForm) => {
    return await bcrypt.compare(passwordForm, password)
}

const autenticar = async (req, res) => {
    const {email, password} = req.body;
    let user = {};
    let pass = "";
    try {
        const usuario = await Usuario.findOne({
            where: {
                email: email
            }
        });
        //Comprobar si el usuario existe
        if (!usuario) {
            const estudiante = await Estudiantes.findOne({
                where: {
                    email: email
                }
            });
            if (!estudiante) {
                const personal = await Personal.findOne({
                    where: {
                        email: email
                    }
                });
                if (!personal) {
                    const error = new Error("El usuario no existe");
                    return res.status(404).json({msg: error.message})
                }
                else{
                    user = {
                        idUsuario: personal.idPersonal,  
                        email: personal.email,
                        token: generarJWT(personal.idPersonal, personal.email),
                        tipoUsuario: personal.tipoUsuario
                    }
                    pass = personal.password;
                }
            } else{
                pass = estudiante.password;
                user = {
                    idUsuario: estudiante.numeroControl,  
                    email: estudiante.email,
                    token: generarJWT(estudiante.numeroControl, estudiante.email),
                    tipoUsuario: estudiante.tipoUsuario
                }
            }
        }else{
            pass = usuario.password;
            user = {
                idUsuario: usuario.idUsuario,  
                email: usuario.email,
                token: generarJWT(usuario.idUsuario, usuario.email),
                tipoUsuario: usuario.tipoUsuario
            };
        }
         
        //Comprobar el password
        if (await comprobarPassword(pass, password)) { 
            res.json(user);
        }
        else{
            const error = new Error("El Password es Incorrecto");
            return res.status(403).json({msg: error.message})
        }
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:212 ~ autenticar ~ error", error);
    }
    
}

const perfil = async (req, res) =>{
    const {usuario} = req;
    res.json(usuario);
}

const obtenerUsuarioPorTurno = async (req, res) =>{
    const {turno} = req.body;
    try {
        const usuario = await Usuario.findOne({
            where: {
                turno: turno,
                tipoUSuario : "Usuario"
            }
        });
        if (!usuario) {
            res.json({
                msg: "Usuario no Encontrado"
            });
        }
        res.json({
            idUsuario: usuario.idUsuario, 
            nombre: usuario.nombre,
            apellidoP: usuario.apellidoP,
            apellidoM: usuario.apellidoM,
            turno: usuario.turno,
            email: usuario.email,
        });
    } catch (error) {
        console.log("🚀 ~ file: UsuarioController.js:273 ~ obtenerUsuarioPorTurno ~ error:", error)
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
    eliminarHorarioUsuario,
    autenticar,
    perfil,
    obtenerUsuarioPorTurno
}