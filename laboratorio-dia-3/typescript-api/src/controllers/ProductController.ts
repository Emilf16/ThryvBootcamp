import { Request, Response } from "express";
import { Product } from "../models/Product";

// Type Guard para validar los datos del producto
function isValidProduct(data: any): data is { nombre: string; precio: number } {
  return (
    typeof data.nombre === "string" && data.nombre.trim() !== "" && typeof data.precio === "number" && data.precio >= 0
  );
}

export class ProductController {
  // Obtener productos con paginación
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    try {
      const productos = await Product.find().skip(skip).limit(limit);
      const total = await Product.countDocuments();
      res.json({
        total,
        page,
        limit,
        productos
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Error desconocido" });
      }
    }
  }

  // Crear un producto
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      if (!isValidProduct(req.body)) {
        res.status(400).json({ error: "Datos del producto inválidos: El nombre no puede estar vacío y el precio no puede ser negativo" });
        return;
      }

      const nuevoProducto = new Product(req.body);
      await nuevoProducto.save();
      res.status(201).json(nuevoProducto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Error desconocido" });
      }
    }
  }

  // Actualizar un producto
  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      if (!isValidProduct(req.body)) {
        res.status(400).json({ error: "Datos del producto inválidos: El nombre no puede estar vacío y el precio no puede ser negativo" });
        return;
      }

      const producto = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      res.json(producto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Error desconocido" });
      }
    }
  }

  // Eliminar un producto
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const producto = await Product.findByIdAndDelete(req.params.id);
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      res.json({ message: "Producto eliminado" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Error desconocido" });
      }
    }
  }
}
