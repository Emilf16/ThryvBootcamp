# Proyecto: API Segura con Express y MongoDB

Este proyecto es una API REST segura desarrollada con **Node.js, Express y MongoDB**. Implementa autenticación con **JSON Web Tokens (JWT)**, seguridad con **Helmet y CORS**, y una conexión segura mediante **HTTPS**.

## 🚀 Características

- Servidor Express.js con HTTPS.
- Conexión a MongoDB usando Mongoose.
- Registro e inicio de sesión con JWT.
- Middleware de autenticación para proteger rutas.
- Seguridad mejorada con Helmet y CORS.

## ⚠️ Errores Encontrados y Soluciones

### 1. OpenSSL no viene preinstalado en Windows

- En el laboratorio, se indica que se debe generar un certificado SSL con OpenSSL.
- **Solución:** Si usas Windows, puedes utilizar **Git Bash**, que incluye OpenSSL, o instalarlo manualmente desde [https://slproweb.com/products/Win32OpenSSL.html](https://slproweb.com/products/Win32OpenSSL.html).

### 2. El token siempre daba inválido debido al prefijo "Bearer"

- En `authMiddleware.js`, el código original tomaba el token directamente de `req.header("Authorization")`, lo que incluía el prefijo `Bearer`.
- **Solución:** Se modificó el código para remover el prefijo:
  ```js
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acceso denegado" });
  ```

Con estos cambios, la API ahora es más segura y estable. 🚀
