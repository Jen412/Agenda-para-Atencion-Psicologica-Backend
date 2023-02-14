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

//Cobaloradores
router.post("/colab/:id", agregarColab);
router.get("/colab/:id", obtenerColabs);

router.route("/colab/:idCita/:idColab")
    .get(obtenerColab)
    .delete(eliminarColab);


export default router;