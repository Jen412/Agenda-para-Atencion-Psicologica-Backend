import { Estudiantes } from "../database/models/Estudiantes.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

const obtenerEstudiantes = async (req, res) =>{
    const estudiante = await Estudiantes.findAll();
    return res.json(estudiante);
}

const obtenerEstudiante = async (req, res) =>{
    const {id} = req.params;
    const estudiante = await Estudiantes.findByPk(id);
    if (!estudiante) {
        const error = new Error("Estudiante no Econtrado");
        return res.status(404).json({mensaje: error.message});
    }
    return res.json(estudiante);
}

const agregarEstudiante = async (req, res)=>{
    const estudiante = req.body;
    const {password} = req.body;
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        let newPasword = bcrypt.hashSync(password, salt);
        estudiante.password = newPasword;
        const newStudent = await Estudiantes.create(estudiante);
        return res.json(newStudent);
    } catch (error) {
        console.log("🚀 ~ file: EstudiantesController.js:25 ~ agregarEstudiante ~ error", error)
    }
}

const modificarEstudiante = async (req, res) =>{
    const {id} = req.params;
    const estudiante =  await Estudiantes.findByPk(id);
    if (!estudiante) {
        const error = new Error("Estudiante no Econtrado");
        return res.status(404).json({mensaje: error.message});
    }
    estudiante.nombre = req.body.nombre || estudiante.nombre;
    estudiante.apellidoP = req.body.apellidoP || estudiante.apellidoP;
    estudiante.apellidoM = req.body.apellidoM || estudiante.apellidoM;
    estudiante.turno = req.body.turno || estudiante.turno;
    estudiante.sexo = req.body.sexo || estudiante.sexo;
    estudiante.telefono = req.body.telefono || estudiante.telefono;
    estudiante.email = req.body.email || estudiante.email;
    estudiante.password = req.body.password || estudiante.password;
    estudiante.idCarrera = req.body.idCarrera || estudiante.idCarrera;
    estudiante.tipoUsuario = req.body.tipoUsuario || estudiante.tipoUsuario;
    try {
        const estudianteActualizado = await estudiante.save();
        return res.json(estudianteActualizado);
    } catch (error) {
        console.log("🚀 ~ file: EstudiantesController.js:43 ~ modificarEstudiante ~ error", error)
    }
}

const eliminarEstudiante = async (req, res) =>{
    const {id} = req.params;
    const estudiante = await Estudiantes.findByPk(id);
    if (!estudiante) {
        const error = new Error("Estudiante no Econtrado");
        return res.status(404).json({mensaje: error.message});
    }
    try {
        await estudiante.destroy({
            where:{
                numeroControl: id
            }
        });
        res.json({mensaje:"Estudiante Eliminado Corectamente"});
    } catch (error) {
        console.log("🚀 ~ file: EstudiantesController.js:62 ~ eliminarEstudiante ~ error", error)
    }
}

export{
    obtenerEstudiantes,
    agregarEstudiante,
    modificarEstudiante,
    eliminarEstudiante,
    obtenerEstudiante
}