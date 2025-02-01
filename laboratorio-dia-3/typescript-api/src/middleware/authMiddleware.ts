import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.header("Authorization") ?? "";

  // Verificar si el token es undefined o null
  if (!token || token === "") {
    res.status(401).json({ message: "Acceso denegado" });
  }

  // Si el token tiene el prefijo "Bearer ", eliminarlo
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  console.log("Token recibido:", token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = verified;
    next();
  } catch {
    res.status(400).json({ message: "Token inválido" });
  }
}
