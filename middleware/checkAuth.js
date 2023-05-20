import jwt from "jsonwebtoken";
import { Usuario } from "../database/models/Usuarios.js";
import { Estudiantes } from "../database/models/Estudiantes.js"
import { Personal } from "../database/models/Personal.js";
 
const checkAuth = async (req, res, next) =>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let usuario = await Usuario.findOne({
                where:{
                    idUsuario: decoded.id,
                    email: decoded.email
                },
                "attributes": ["idUsuario","email", "tipoUsuario", "turno"]
            });
            if(!usuario){
                usuario = await Estudiantes.findOne({
                    where: {
                        numeroControl: decoded.id,
                        email: decoded.email, 
                    },
                    "attributes": ["numeroControl", "email", "tipoUsuario", "turno"]
                });
                if (!usuario) {
                    usuario = await Personal.findOne({
                        where: {
                            idPersonal: decoded.id,
                            email: decoded.email, 
                        },
                        "attributes": ["idPersonal", "email", "tipoUsuario", "turno"]
                    })
                }
            }
            req.usuario = usuario;
            return next();
        } catch (error) {
            console.log("🚀 ~ file: checkAuth.js:12 ~ checkAuth ~ error", error)
            return res.status(404).json({msg: "Hubo un error"});
        }
    }
    if (!token) {
        const error = new Error("Token no válido");
        res.status(401).json({msg: error.message});
    }
    next();
}

export default checkAuth;