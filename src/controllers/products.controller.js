import { getAll, getById, create, update, remove } from '../services/products.service.js';

// Obtener todos los productosls
export const getAllProducts = (req, res) => {
  res.json(getAll());
};

// Obtener un producto por ID
export const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const producto = getById(id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
};

// Crear un nuevo producto
export const createProduct = (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }
  const nuevoProducto = create({ nombre, precio, categoria, stock });
  res.status(201).json(nuevoProducto);
};

// Actualizar un producto completo
export const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }
  const producto = update(id, { nombre, precio, categoria, stock });
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
};

// Eliminar un producto
export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminado = remove(id);
  if (!eliminado) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json({ mensaje: 'Producto eliminado correctamente' });
};