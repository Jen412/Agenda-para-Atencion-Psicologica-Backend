import express from "express";
import {
    agregarDiaEspecial,
    obtenerDiaEspecial,
    obtenerDiasEspeciales,
    modificarDiaEspecial,
    eliminarDiasEspecial,
    comprobarCita
} from "../controllers/DiasEspecialesController.js";

const router = express.Router();

router.get("/", obtenerDiasEspeciales);
router.post("/",agregarDiaEspecial);

router.route("/:id")
    .get(obtenerDiaEspecial)
    .put(modificarDiaEspecial)
    .delete(eliminarDiasEspecial);

router.post("/comprobar", comprobarCita);

export default router;
