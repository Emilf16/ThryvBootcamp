import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Acceso denegado" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = verified;
        next();
    } catch {
        res.status(400).json({ message: "Token inválido" });
    }
}