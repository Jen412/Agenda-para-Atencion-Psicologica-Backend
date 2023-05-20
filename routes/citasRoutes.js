import express from "express";
import {
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
    procesarCita
} from "../controllers/CitasController.js";

const router = express.Router();

router.get("/", obtenerCitas);
router.post("/", agregarCita);
router.get("/paciente/:idPaciente", obtenerCitaPaciente);

router.route("/:id")
    .get(obtenerCita)
    .put(modificarCita)
    .delete(eliminarCita);

router.post("/primeraCita", primeraCita);
router.post("/cancelar/:id", cancelarCita);
router.post("/confirmar/:id", confirmarCita);
router.put("/procesar/:idCita", procesarCita);
router.get("/numeroCitas/:idPaciente", numeroDeCitas);


//Cobaloradores
router.post("/colab/:id", agregarColab);
router.get("/colab/:id", obtenerColabs);

router.route("/colab/:idCita/:idColab")
    .get(obtenerColab)
    .delete(eliminarColab);


export default router;