import { Carreras } from "../database/models/Carreras.js";

const obtenerCarreras= async (req, res)=>{
    const carreras = await Carreras.findAll();
    return res.json(carreras);
}

const obtenerCarrera= async (req, res)=>{
    const {id} = req.params;
    const carrera = await Carreras.findByPk(id);
    if (!carrera) {
        const error = new Error("Carrera no Econtrada");
        return res.status(404).json({msg: error.message});
    }
    return res.json(carrera);
}

const registrarCarrera= async (req, res)=>{
    const carrera = req.body;
    try {
        const newCarrera = await Carreras.create(carrera);
        newCarrera.nombreCarrera = newCarrera.nombreCarrera.toUpperCase();
        return res.json(newCarrera);
    } catch (error) {
        console.log("🚀 ~ file: CarrerasController.js:25 ~ registrarCarrera ~ error", error)
    }
}

const modificarCarrera= async (req, res)=>{
    const {id} = req.params;
    const carrera =  await Carreras.findByPk(id);
    if (!carrera) {
        const error = new Error("Carrera no Econtrada");
        return res.status(404).json({msg: error.message});
    }
    carrera.nombreCarrera = req.body.nombreCarrera || carrera.nombreCarrera;
    try {
        const carreraActualizada = await carrera.save();
        return res.json(carreraActualizada);
    } catch (error) {
        console.log("🚀 ~ file: CarrerasController.js:37 ~ modificarCarrera ~ error", error)
    }
}

const eliminarCarrera= async (req, res)=>{
    const {id} = req.params;
    const carrera =  await Carreras.findByPk(id);
    if (!carrera) {
        const error = new Error("Carrera no Econtrada");
        return res.status(404).json({msg: error.message});
    }
    try {
        await Carreras.destroy({
            where:{
                idCarrera: id
            }
        });
        res.json({msg:"Carrera Eliminada Corectamente"});
    } catch (error) {
        console.log("🚀 ~ file: CarrerasController.js:51 ~ eliminarCarrera ~ error", error)
    }

}

export {
    obtenerCarrera,
    obtenerCarreras, 
    registrarCarrera,
    modificarCarrera,
    eliminarCarrera
}