import express from "express";
import {
    obtenerEstudiantes,
    agregarEstudiante,
    modificarEstudiante,
    eliminarEstudiante,
    obtenerEstudiante
} from "../controllers/EstudiantesController.js";

const router = express.Router();

router.get("/", obtenerEstudiantes);
router.post("/", agregarEstudiante);

router.route("/:id")
    .get(obtenerEstudiante)
    .put(modificarEstudiante)
    .delete(eliminarEstudiante);


export default router;