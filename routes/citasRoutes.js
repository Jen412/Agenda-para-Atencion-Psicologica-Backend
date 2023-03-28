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
import {
    obtenerNotas, 
    obtenerNota, 
    agregarNota,
    modificarNota,
    eliminarNota
} from "../controllers/NotasController.js";

const router = express.Router();

router.get("/", obtenerCitas);
router.post("/", agregarCita);

router.route("/:id")
    .get(obtenerCita)
    .put(modificarCita)
    .delete(eliminarCita);

router.post("/cancelar/:id", cancelarCita);
router.post("/confirmar/:id", confirmarCita);

//Notas
router.get("/notas/:idCita", obtenerNotas);
router.post("/notas/:idCita", agregarNota);

router.route("/notas/:idCita/:idNota")
    .get(obtenerNota)
    .put(modificarNota)
    .delete(eliminarNota);

//Cobaloradores
router.post("/colab/:id", agregarColab);
router.get("/colab/:id", obtenerColabs);

router.route("/colab/:idCita/:idColab")
    .get(obtenerColab)
    .delete(eliminarColab);


export default router;