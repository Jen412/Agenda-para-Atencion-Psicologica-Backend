import express from "express";
import {
    obtenerUsuarios,
    agregarUsusario,
    modificarUsuario,
    eliminarUsuario,
    obtenerUsuario,
    agregarHorarioUsuario,
    obtenerHorariosUsuario,
    obtenerHorarioUsuario,
    modificarHorarioUsuario,
    eliminarHorarioUsuario,
    autenticar
} from "../controllers/UsuarioController.js"

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", agregarUsusario);

router.route("/:id")
    .get(obtenerUsuario)
    .put(modificarUsuario)
    .delete(eliminarUsuario);

router.get("/:id/horario", obtenerHorariosUsuario);
router.post("/:id/horario", agregarHorarioUsuario);

router.route("/:idUsuario/horario/:idHorario")
    .get(obtenerHorarioUsuario)
    .put(modificarHorarioUsuario)
    .delete(eliminarHorarioUsuario);

router.post("/login", autenticar);


export default router;