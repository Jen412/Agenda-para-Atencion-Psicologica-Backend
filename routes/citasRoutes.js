import express from "express";
import {
    obtenerCitas,
    agregarCita,
    modificarCita,
    eliminarCita,
    obtenerCita,
    cancelarCita,
    confirmarCita
} from "../controllers/CitasController.js";

const router = express.Router();

router.get("/", obtenerCitas);
router.post("/", agregarCita);

router.route("/:id")
    .get(obtenerCita)
    .put(modificarCita)
    .delete(eliminarCita);

router.post("/cancelar/:id", cancelarCita);
router.post("/confirmar/:id", confirmarCita);

export default router;