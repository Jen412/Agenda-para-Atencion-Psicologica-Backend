import { DiasEspeciales } from "../database/models/DiasEspeciales.js"

const obtenerDiasEspeciales = async (req, res) =>{
    try {
        const dias = await DiasEspeciales.findAll();
        res.json(dias);
    } catch (error) {
        console.log("🚀 ~ file: DiasEspecialesController.js:8 ~ obtenerDiasEspeciales ~ error:", error)
    }
}

const obtenerDiaEspecial = async (req, res) =>{
    const {id} = req.params;
    try {
        const dia = await DiasEspeciales.findByPk(id);
        if (!dia) {
            const error = new Error("Dia No Registrado");
            return res.status(404).json({mensaje: error.message});
        }
        return res.json(dia);
    } catch (error) {
        console.log("🚀 ~ file: DiasEspecialesController.js:22 ~ obtenerDiaEspecial ~ error:", error)
    }
}

const modificarDiaEspecial = async (req, res) =>{
    const {id} = req.params;
    try {
        const dia = await DiasEspeciales.findByPk(id);
        if (!dia) {
            const error = new Error("Dia No Registrado");
            return res.status(404).json({mensaje: error.message});
        }
        dia.fechaDia = req.body.fechaDia || dia.fechaDia;
        dia.descripcion = req.body.descripcion || dia.descripcion;
        const diaActualizado = await dia.save();
        return res.json(diaActualizado);
    } catch (error) {
        console.log("🚀 ~ file: DiasEspecialesController.js:39 ~ modificarDiaEspecial ~ error:", error)
    }
}

const eliminarDiasEspecial = async (req, res) =>{
    const {id} = req.params;
    try {
        const dia = await DiasEspeciales.findByPk(id);
        if (!dia) {
            const error = new Error("Dia No Registrado");
            return res.status(404).json({mensaje: error.message});
        }
        await DiasEspeciales.destroy({
            where: {
                idDia: id
            }
        });
        return res.json({mensaje: "Dia Especial Eliminado Correctamente"});
    } catch (error) {
        console.log("🚀 ~ file: DiasEspecialesController.js:58 ~ eliminarDiasEspecial ~ error:", error)
    }
}

const agregarDiaEspecial = async (req, res) =>{
    const {fechaDia, descripcion} = req.body;
    try {
        const newDay = await DiasEspeciales.create({fechaDia, descripcion})
        return res.json(newDay);
    } catch (error) {
        console.log("🚀 ~ file: DiasEspecialesController.js:68 ~ agregarDiaEspecial ~ error:", error);
    }
}

const comprobarCita = async (req, res, next)=>{
    const {fecha} =req.body;
    try {
        let respuesta ={
            mensaje: "",
            error: false
        };
        const days = await DiasEspeciales.findAll();
        days.forEach(day => {
            let fechaDB =day.fechaDia;
            fechaDB = new Date(fechaDB);                
            fechaDB = fechaDB.toISOString();
            let fechaSplit = fechaDB.split("T")[0];
            let fechaCita = fecha;
            if (fechaSplit===fechaCita) {
                respuesta = {
                    mensaje: "Fecha Invalida",
                    error: true
                };
            }
        });
        return res.json(respuesta);
    } catch (error) {
        console.log("🚀 ~ file: DiasEspecialesController.js:88 ~ comprobarCita ~ error:", error)
    }
}

export{
    obtenerDiasEspeciales,
    obtenerDiaEspecial, 
    modificarDiaEspecial,
    eliminarDiasEspecial,
    agregarDiaEspecial,
    comprobarCita
}