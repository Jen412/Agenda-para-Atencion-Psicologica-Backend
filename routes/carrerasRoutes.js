import express from "express";
import {
    obtenerCarreras, 
    obtenerCarrera, 
    registrarCarrera, 
    modificarCarrera, 
    eliminarCarrera
} from "../controllers/CarrerasController.js";

const router = express.Router();

router.get("/", obtenerCarreras);
router.post("/", registrarCarrera);

router.route("/:id")
    .get(obtenerCarrera)
    .put(modificarCarrera)
    .delete(eliminarCarrera);

export default router;