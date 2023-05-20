//database/models
import {  Citas } from "../database/models/Citas.js";
import { Estudiantes } from "../database/models/Estudiantes.js";
import { Personal } from "../database/models/Personal.js";
import { Usuario } from "../database/models/Usuarios.js";
//Helpers
import { emailCitaCancelada, emailConfirmarCita } from "../helpers/emails.js";
import { formatoFecha } from "../helpers/formatoFecha.js";
import { Colaborador } from "../database/models/Colaboradores.js";

const obtenerCitas = async (req, res) =>{ 
    try {
        const citas = await Citas.findAll();
        return res.json(citas);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:15 ~ obtenerCitas ~ error:", error);
    }
}

const obtenerCitaPaciente = async (req, res)=>{
    const {idPaciente} = req.params;
    try {
        const citas = await Citas.findAll({
            where: {
                idPaciente: idPaciente
            }
        });
        return res.json(citas);
    } catch (error) {
        res.json(error);
        console.log("🚀 ~ file: CitasController.js:29 ~ obtenerCitaPaciente ~ error:", error)
    }
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
        console.log(newCita)
        let paciente="";
        if (newCita.estudiante) {
            paciente = await Estudiantes.findOne({
                where: {
                    numeroControl: newCita.idPaciente
                }
            });
        }  
        else{
            paciente= await Personal.findOne({
                where: {
                    idPersonal: newCita.idPaciente 
                }
            });
        }
        await emailConfirmarCita({
            email: paciente.email, 
            nombre: (paciente.nombre + " "+ paciente.apellidoP + " "+ paciente.apellidoM),
            fecha: formatoFecha(newCita.fechaCita),
            hora: newCita.horaCita, 
            idCita: newCita.idCita
        });
        return res.json(newCita);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:24 ~ agregarCita ~ error", error)
        res.json(error)
    }
}

const modificarCita = async (req, res) =>{
    const {id} = req.params;
    try {
        const cita =  await Citas.findByPk(id);
        if (!cita) {
            const error = new Error("Cita no Econtrada");
            return res.status(404).json({mensaje: error.message});
        }
        cita.horaCita = req.body.horaCita || cita.horaCita;
        cita.fechaCita = req.body.fechaCita || cita.fechaCita;
        cita.motivo = req.body.motivo || cita.motivo;
        cita.primeraCita = req.body.primeraCita || cita.primeraCita;
        cita.idColaborador = req.body.idColaborador || cita.idColaborador;
        cita.idPaciente = req.body.idPaciente || cita.idPaciente;
        cita.observaciones = req.body.observaciones || cita.observaciones;
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
        //console.log(citaCancelada);
        await emailCitaCancelada({
            fecha: formatoFecha(citaCancelada.fechaCita),
            hora: citaCancelada.horaCita,
            email: paciente.email
        });
        return res.json(citaCancelada);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:81 ~ cancelarCita ~ error", error)
    }
}

const confirmarCita = async(req, res)=>{
    const {id} = req.params;
    try {
        const cita = await Citas.findByPk(id);
        if (!cita) {
            const error = new Error("Cita no Econtrada");     
            return res.status(404).json({mensaje: error.message});
        }
        cita.fechaConfirmacion = Date.now();
        const citaConfirmada = await cita.save();
        return res.json(citaConfirmada);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:97 ~ confirmarCita ~ error", error)
    }
}

const agregarColab = async(req, res)=>{
    const {id} = req.params;
    const colab = req.body;
    try {
        const cita = await Citas.findByPk(id);
        if (!cita) {
            const error = new Error("Cita no Econtrada");     
            return res.status(404).json({mensaje: error.message});
        }
        const newColab = await Colaborador.create(colab);
        res.json(newColab);
    } catch (error) {6
        console.log("🚀 ~ file: CitasController.js:147 ~ agregarColab ~ error", error)
    }
}

const obtenerColabs= async(req, res)=>{
    const {id} = req.params;
    try {
        const cita = await Citas.findByPk(id);
        if (!cita) {
            const error = new Error("Cita no Econtrada");     
            return res.status(404).json({mensaje: error.message});
        }
        const colabs= await Colaborador.findAll({
            where: {
                idCita: id
            }
        });
        res.json(colabs);
    }
    catch(error){
        console.log("🚀 ~ file: CitasController.js:167 ~ obtenerColabs ~ error", error)
    }
}

const obtenerColab = async (req, res)=>{
    const {idCita, idColab} = req.params;
    try {
        const cita = await Citas.findByPk(idCita);
        if (!cita) {
            const error = new Error("Cita no Econtrada");     
            return res.status(404).json({mensaje: error.message});
        }
        const colab= await Colaborador.findOne({
            where: {
                idCita: idCita,
                idColab: idColab
            }
        });
        res.json(colab);
    }
    catch(error){
        console.log("🚀 ~ file: CitasController.js:188 ~ obtenerColab ~ error", error)
    }
}

const eliminarColab = async (req, res)=>{
    const {idCita, idColab} = req.params;
    try {
        const cita = await Citas.findByPk(idCita);
        if (!cita) {
            const error = new Error("Cita no Econtrada");     
            return res.status(404).json({mensaje: error.message});
        }
        const colab= await Colaborador.findOne({
            where: {
                idCita: idCita,
                idColab: idColab
            }
        });
        await colab.destroy({
            where: {
                idColab: idColab
            }
        });
        res.json({mensaje: "Colaborador Eliminado"});
    }
    catch(error){
        console.log("🚀 ~ file: CitasController.js:214 ~ eliminarColab ~ error", error)
    }
}

const primeraCita = async (req, res)=> {
    const {idPaciente} = req.body;
    try {
        const cita = await Citas.findAll({
            where:{
                idPaciente: idPaciente
            }
        });
        if (cita.length ===0) {
            res.json({primeraCita: true});
        }
        else{
            res.json({
                primeraCita:false
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:243 ~ primeraCita ~ error:", error)
    }
}

const numeroDeCitas = async (req, res)=>{
    const {idPaciente} = req.params;
    try {
        const citas = await Citas.findAll({
            where: {
                idPaciente: idPaciente,
                fechaCancelacion: null
            }
        });
        res.json({
            numCitas: citas.length
        })
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:280 ~ numeroDeCitas ~ error:", error)
    }
}

const procesarCita = async (req, res) =>{
    const {idCita} = req.params;
    try {
        const cita = await Citas.findByPk(idCita);
        if (!cita) {
            const error = new Error("Cita no Econtrada");
            return res.status(404).json({mensaje: error.message});
        }
        cita.observaciones= req.body.observaciones || cita.observaciones;
        cita.procesada= true;
        const citaActualizada = await cita.save();
        return res.json(citaActualizada);
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:299 ~ procesarCita ~ error:", error)
    }
}

//Estadisticas
const obtenerDatosEstadisticasCarreras = async (req, res) =>{
    const {idCarrera} = req.params;
    const {periodoTiempo} = req.body;
    try {
        const citas = await Citas.findAll({
            where: {
                idCarrera: idCarrera
            }
        });
        if (periodoTiempo === "mes") {
            const meses = ["Enero", "Ferbrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            
        }
    } catch (error) {
        
    }

}


export{
    obtenerCitas,
    agregarCita,
    modificarCita,
    eliminarCita,
    obtenerCita,
    cancelarCita,
    confirmarCita,
    agregarColab,
    obtenerColabs,
    obtenerColab,
    eliminarColab,
    primeraCita,
    obtenerCitaPaciente,
    numeroDeCitas,
    procesarCita,
    obtenerDatosEstadisticasCarreras
}