import mongoose from "mongoose";

class Database {
    private static instance: Database;

    private constructor() {
        mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export const db = Database.getInstance();