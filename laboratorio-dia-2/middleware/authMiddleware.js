const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado: No se proporcionó un token" });
  }

  // Si el token tiene el prefijo "Bearer ", eliminarlo
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  console.log("Token recibido:", token);

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("Error: JWT_SECRET no está definido en las variables de entorno.");
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Token inválido" });
    } else {
      return res.status(400).json({ message: "Error al procesar el token" });
    }
  }
};
