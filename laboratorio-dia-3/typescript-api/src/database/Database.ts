import mongoose from "mongoose";
import dotenv from "dotenv";  // Importar dotenv
dotenv.config();  // Cargar las variables de entorno
class Database {
    private static instance: Database;

    private constructor() {
        console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

        mongoose.connect(process.env.MONGO_URI!)
            .then(() => console.log("📌 Conectado a MongoDB"))
            .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export const db = Database.getInstance();
