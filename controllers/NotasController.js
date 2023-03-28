import { Notas } from "../models/Notas.js";

const obtenerNotas = async (req, res) =>{
    const {idCita} = req.params;
    try {
        const notas = await Notas.findAll({
            where: {
                idCita: idCita
            }
        });
        res.json(notas);
    } catch (error) {
        res.json(error);
    }
}

const obtenerNota = async (req, res) =>{
    const {idCita, idNota} = req.params;
    try {
        const nota = await Notas.findOne({
            where: {
                idCita: idCita, 
                idNota: idNota
            }
        });
        res.json(nota);
    } catch (error) {
        res.json(error);
    }
}

const agregarNota = async (req, res) =>{
    const {idCita} = req.params;
    const {texto} = req.body;
    try {
        const nota = await Notas.create({texto, idCita});
        res.json(nota);
    } catch (error) {
        res.json(error);
    }
}

const modificarNota = async (req, res) =>{
    const {idCita, idNota} = req.params;
    try {
        const nota = await Notas.findOne({
            where: {
                idCita: idCita, 
                idNota: idNota
            }
        });
        nota.texto = req.body.texto || nota.texto;
        await nota.save();
        res.json(nota);
    } catch (error) {
        res.json(error);
    }
}

const eliminarNota = async (req, res) =>{
    const {idCita, idNota} = req.params;
    try {
        await Notas.destroy({
            where: {
                idCita: idCita, 
                idNota: idNota
            }
        });
        res.json({msg: "Nota Borrada Correctamente"});
    } catch (error) {
        res.json(error);
    }
}

export {
    obtenerNotas, 
    obtenerNota, 
    agregarNota,
    modificarNota,
    eliminarNota
}