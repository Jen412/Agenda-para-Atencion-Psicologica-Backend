import express from "express";
import {
    obtenerPersonalCompleto,
    agregarPersonal,
    modificarPersonal,
    eliminarPersonal,
    obtenerPersonal
} from "../controllers/PersonalController.js";

const router = express.Router();

router.get("/", obtenerPersonalCompleto);
router.post("/", agregarPersonal);

router.route("/:id")
    .get(obtenerPersonal)
    .put(modificarPersonal)
    .delete(eliminarPersonal);


export default router;