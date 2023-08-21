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
    perfil,
    obtenerUsuarioPorTurno,
    comprobarToken,
    nuevoPassword,
    olvidePassword
} from "../controllers/UsuarioController.js"

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", agregarUsusario);
router.post("/login", autenticar);
router.get("/perfil", checkAuth, perfil);
router.post("/turno", obtenerUsuarioPorTurno);
router.post("/olvide-password", olvidePassword); //Nos brinda un nuevo token para cuando se pierda la password
router.route("/olvide-password/:token")
    .get(comprobarToken)
    .post(nuevoPassword); // lee un token para validarlo y Valida y guarda un nuevo password

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