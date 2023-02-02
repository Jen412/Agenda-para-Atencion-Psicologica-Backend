import express from "express";
import {
    obtenerUsuarios,
    agregarUsusario,
    modificarUsuario,
    eliminarUsuario,
    obtenerUsuario
} from "../controllers/UsuarioController.js"

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", agregarUsusario);

router.route("/:id")
    .get(obtenerUsuario)
    .put(modificarUsuario)
    .delete(eliminarUsuario);


export default router;