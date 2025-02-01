import express, { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Logger } from "../decorators/Logger";

// Definimos la clase AuthController
class AuthController {
    @Logger
    static async register(req: Request, res: Response) {
        try {
            console.log(req.body, 'req')
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({ username: req.body.username, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: "Usuario registrado" });
        } catch (error) {
            res.status(500).json({ message: `Error al registrar el usuario`, error });
        }
    }

    @Logger
    static async login(req: Request, res: Response) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: "Error al iniciar sesión", error });
        }
    }
}

// Creamos el enrutador
const authRouter = express.Router();

// Definimos las rutas usando RequestHandler para tipar los manejadores
authRouter.post("/register", AuthController.register as RequestHandler);
authRouter.post("/login", AuthController.login as RequestHandler);

// Exportamos el enrutador
export { authRouter };