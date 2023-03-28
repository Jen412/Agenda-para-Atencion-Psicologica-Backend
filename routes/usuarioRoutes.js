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
    autenticar,
    perfil
} from "../controllers/UsuarioController.js"

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", agregarUsusario);
router.post("/login", autenticar);
router.get("/perfil", checkAuth, perfil);

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




export default router;