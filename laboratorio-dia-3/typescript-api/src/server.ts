import express from "express";
import https from "https";
import fs from "fs";
import helmet from "helmet";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import "reflect-metadata"; // Necesario para decoradores

const app = express();

// Seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRouter);
app.use("/users", userRouter);

// Configurar HTTPS
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
};

https.createServer(options, app).listen(443, () => {
    console.log("🔒 Servidor HTTPS corriendo en https://localhost");
});
