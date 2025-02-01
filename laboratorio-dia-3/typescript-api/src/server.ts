import express from "express";
import https from "https";
import fs from "fs";
import helmet from "helmet";
import cors from "cors"; 
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { db } from "./database/Database"; // Importar la conexión a la base de datos
import "reflect-metadata"; // Necesario para decoradores
import { productRouter } from "./routes/products";
// Cargar variables de entorno 

const app = express();

// Seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

// Configurar HTTPS
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
};

// Verificar conexión a MongoDB antes de levantar el servidor
const startServer = async () => {
    try {
        // Forzar la inicialización de la conexión
        db;

        // Iniciar el servidor HTTPS
        https.createServer(options, app).listen(443, () => {
            console.log("🔒 Servidor HTTPS corriendo en https://localhost");
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

// Iniciar el servidor
startServer();
