import express from "express";
import dotenv from "dotenv";


//importación de rutas 
import usuarioRoutes from "./routes/usuarioRoutes.js";
const app = express();

dotenv.config();

const port = process.env.PORT || 4000;

app.use("/api/usuarios", usuarioRoutes);





app.listen(port,()=>{
    console.log(`Servidor Corriendo en el puerto ${port}`);
});