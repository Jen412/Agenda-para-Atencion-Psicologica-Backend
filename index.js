import express from "express";
import dotenv from "dotenv";

import {sequelize} from "./db/database.js"

//importación de rutas 
import usuarioRoutes from "./routes/usuarioRoutes.js";
import carrerasRoutes from "./routes/carrerasRoutes.js";
import estudiantesRoutes from "./routes/estudiantesRoutes.js";
import personalRoutes from "./routes/personalRoutes.js";
import citasRoutes from "./routes/citasRoutes.js";

const app = express();

app.use(express.json()); 

dotenv.config();

const port = process.env.PORT || 4000;

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/carreras", carrerasRoutes);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/personal", personalRoutes);
app.use("/api/citas", citasRoutes);





app.listen(port, async()=>{
    try {
        await sequelize.sync({force: false}); 
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Servidor Corriendo en el puerto ${port}`);
});