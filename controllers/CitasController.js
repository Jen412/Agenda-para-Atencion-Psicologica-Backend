//database/models
import {  Citas } from "../database/models/Citas.js";
import { Estudiantes } from "../database/models/Estudiantes.js";
import { Personal } from "../database/models/Personal.js";
import { Colaborador } from "../database/models/Colaboradores.js";
//Helpers
import { emailCitaCancelada, emailConfirmarCita } from "../helpers/emails.js";
import { formatoFecha } from "../helpers/formatoFecha.js";
import dayjs from "dayjs";
import { sequelize } from "../database/config/database.js";

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
        await emailCitaCancelada({
            fecha: formatoFecha(citaCancelada.fechaCita),
            hora: citaCancelada.horaCita,
            email: paciente.email,
            usuario: paciente.nombre + " " + paciente.apellidoP + " " + paciente.apellidoM
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
    const {periodoTiempo} = req.body;
    const {idCarrera}= req.params
    try {
        const [citas, metadata] = await sequelize.query("SELECT citas.fechaCita, citas.idPaciente, estudiantes.nombre, estudiantes.apellidoP, estudiantes.apellidoM,estudiantes.idCarrera FROM `estudiantes` JOIN citas ON citas.idPaciente = estudiantes.numeroControl WHERE citas.estudiante = 1;");
        if (periodoTiempo === "mes") {
            const meses = ["Enero", "Ferbrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            let citasMes =[0,0,0,0,0,0,0,0,0,0,0,0];
            for (let i = 0; i < meses.length; i++) {
                citas.forEach(cita => {
                    if (cita.idPaciente) {
                        if (cita.idCarrera==idCarrera) {
                            let month = cita.fechaCita;
                            month = dayjs(cita.fechaCita);
                            month = month.month();
                            if (i === month) {
                                citasMes[i]++;
                            }
                        }
                    }
                });
            }
            res.json({
                labels: meses, 
                citas: citasMes
            });
        }
        else if(periodoTiempo ==="semestre"){
            const semestres = ["Enero-Junio", "Julio-Diciembre"];
            const citasSem = [0,0];
            citas.forEach(cita =>{
                if (cita.idPaciente) {
                    if (cita.idCarrera==idCarrera) {
                        let month = cita.fechaCita;
                        month = dayjs(cita.fechaCita);
                        month = month.month();
                        if (month >=0 && month <=5) {
                            citasSem[0]++;
                        }
                        else{
                            citasSem[1]++;
                        }
                    }
                }
            });
            res.json({
                labels:semestres,
                citas: citasSem
            });
        }
        else if(periodoTiempo==="anual"){
            let actualYear = dayjs(Date.now());
            actualYear = actualYear.year();
            const anios = [0,0,0,actualYear];
            let cont =1;
            for (let i = anios.length-2; i >= 0; i--) {
                anios[i] = actualYear-cont;
                cont++;
            }
            const citasAnio = [0,0,0,0];
            for (let i = 0; i < anios.length; i++) {
                citas.forEach(cita =>{
                    if (cita.idPaciente) {
                        if (cita.idCarrera==idCarrera) {
                            let year = cita.fechaCita;
                            year = dayjs(cita.fechaCita);
                            year = year.year();
                            if (year === anios[i]) {
                                citasAnio[i]++;
                            }
                        }
                    }
                });
            }
            res.json({
                labels: anios,
                citas: citasAnio
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:385 ~ obtenerDatosEstadisticasCarreras ~ error:", error)
    }
}

const obtenerDatosEstadisticasSexo = async (req, res)=>{
    const {periodoTiempo} = req.body;
    const {sexo}= req.params
    try {
        const [citas, metadata] = await sequelize.query("SELECT citas.fechaCita, citas.idPaciente, estudiantes.nombre, estudiantes.apellidoP, estudiantes.apellidoM,estudiantes.sexo FROM `estudiantes` JOIN citas ON citas.idPaciente = estudiantes.numeroControl WHERE citas.estudiante = 1;");
        if (periodoTiempo === "mes") {
            const meses = ["Enero", "Ferbrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            let citasMes =[0,0,0,0,0,0,0,0,0,0,0,0];
            for (let i = 0; i < meses.length; i++) {
                citas.forEach(cita => {
                    if (cita.idPaciente) {
                        if (cita.sexo==sexo) {
                            let month = cita.fechaCita;
                            month = dayjs(cita.fechaCita);
                            month = month.month();
                            if (i === month) {
                                citasMes[i]++;
                            }
                        }
                    }
                });
            }
            res.json({
                labels: meses, 
                citas: citasMes
            });
        }
        else if(periodoTiempo ==="semestre"){
            const semestres = ["Enero-Junio", "Julio-Diciembre"];
            const citasSem = [0,0];
            citas.forEach(cita =>{
                if (cita.idPaciente) {
                    if (cita.sexo==sexo) {
                        let month = cita.fechaCita;
                        month = dayjs(cita.fechaCita);
                        month = month.month();
                        if (month >=0 && month <=5) {
                            citasSem[0]++;
                        }
                        else{
                            citasSem[1]++;
                        }
                    }
                }
            });
            res.json({
                labels:semestres,
                citas: citasSem
            });
        }
        else if(periodoTiempo==="anual"){
            let actualYear = dayjs(Date.now());
            actualYear = actualYear.year();
            const anios = [0,0,0,actualYear];
            let cont =1;
            for (let i = anios.length-2; i >= 0; i--) {
                anios[i] = actualYear-cont;
                cont++;
            }
            const citasAnio = [0,0,0,0];
            for (let i = 0; i < anios.length; i++) {
                citas.forEach(cita =>{
                    if (cita.idPaciente) {
                        if (cita.sexo==sexo) {
                            let year = cita.fechaCita;
                            year = dayjs(cita.fechaCita);
                            year = year.year();
                            if (year === anios[i]) {
                                citasAnio[i]++;
                            }
                        }
                    }
                });
            }
            res.json({
                labels: anios,
                citas: citasAnio
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: CitasController.js:385 ~ obtenerDatosEstadisticasCarreras ~ error:", error)
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
    obtenerDatosEstadisticasCarreras,
    obtenerDatosEstadisticasSexo
}