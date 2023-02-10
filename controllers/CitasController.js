//Models
import {  Citas } from "../models/Citas.js";
import { Estudiantes } from "../models/Estudiantes.js";
import { Personal } from "../models/Personal.js";
//Helpers
import { emailCitaCancelada, emailConfirmarCita } from "../helpers/emails.js";
import { formatoFecha } from "../helpers/formatoFecha.js";

const obtenerCitas = async (req, res) =>{ 
    const citas = await Citas.findAll();
    return res.json(citas);
}

const obtenerCita = async (req, res) =>{
    const {id} = req.params;
    const personal = await Citas.findByPk(id);
    if (!personal) {
        const error = new Error("Cita no Econtrada");
        return res.status(404).json({mensaje: error.message});
    }
    return res.json(personal);
}

const agregarCita = async (req, res)=>{
    const cita = req.body;
    try {
        const newCita = await Citas.create(cita);
        let paciente="";
        if (newCita.estudiante) {
            paciente = await Estudiantes.findByPk(newCita.idPaciente);
        }
        else{
            paciente= await Personal.findByPk(newCita.idPaciente);
        }
        await emailConfirmarCita({
            email: paciente.email, 
            nombre: (paciente.nombre + " "+ paciente.apellidoP + " "+ paciente.apellidoM),
            usuario: newCita.idPaciente,
            fecha: formatoFecha(newCita.fechaCita),
            hora: newCita.horaCita
        });
        return res.json(newCita);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:24 ~ agregarCita ~ error", error)
    }
}

const modificarCita = async (req, res) =>{
    const {id} = req.params;
    const cita =  await Citas.findByPk(id);
    if (!cita) {
        const error = new Error("Cita no Econtrada");
        return res.status(404).json({mensaje: error.message});
    }
    cita.horaCita = req.body.horaCita || cita.horaCita;
    cita.fechaCita = req.body.fechaCita || cita.fechaCita;
    cita.notas = req.body.notas || cita.notas;
    cita.motivo = req.body.motivo || cita.motivo;
    cita.primeraCita = req.body.primeraCita || cita.primeraCita;
    cita.idColaborador = req.body.idColaborador || cita.idColaborador;
    cita.idPaciente = req.body.idPaciente || cita.idPaciente;
    try {
        const citaActualizada = await cita.save();
        return res.json(citaActualizada);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:47 ~ modificarCita ~ error", error)
    }
}

const eliminarCita = async (req, res) =>{
    const {id} = req.params;
    const cita = await Citas.findByPk(id);
    if (!cita) {
        const error = new Error("Cita no Econtrada");     
        return res.status(404).json({mensaje: error.message});
    }
    try {
        await cita.destroy({
            where:{
                idCita: id
            }
        });
        res.json({mensaje:"Cita Eliminada Corectamente"});
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:68 ~ eliminarCita ~ error", error)
    }
}
//TODO: Arreglar el envio de emails
const cancelarCita = async (req, res) =>{
    const {id} = req.params;
    const cita = await Citas.findByPk(id);
    if (!cita) {
        const error = new Error("Cita no Econtrada");     
        return res.status(404).json({mensaje: error.message});
    }
    try {
        cita.fechaCancelacion = Date.now();
        const citaCancelada = await cita.save();
        let paciente="";
        if (citaCancelada.estudiante) {
            paciente = await Estudiantes.findByPk(citaCancelada.idPaciente);
        }
        else{
            paciente= await Personal.findByPk(citaCancelada.idPaciente);
        }
        await emailCitaCancelada({
            fecha: formatoFecha(citaCancelada.fechaCita),
            hora: citaCancelada.horaCita,
            email: citaCancelada.email
        });

        return res.json(citaCancelada);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:81 ~ cancelarCita ~ error", error)
    }
}

const confirmarCita = async(req, res)=>{
    const {id} = req.params;
    const cita = await Citas.findByPk(id);
    if (!cita) {
        const error = new Error("Cita no Econtrada");     
        return res.status(404).json({mensaje: error.message});
    }
    try {
        cita.fechaConfirmacion = Date.now();
        const citaConfirmada = await cita.save();
        return res.json(citaConfirmada);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:97 ~ confirmarCita ~ error", error)
    }
}

export{
    obtenerCitas,
    agregarCita,
    modificarCita,
    eliminarCita,
    obtenerCita,
    cancelarCita,
    confirmarCita
}