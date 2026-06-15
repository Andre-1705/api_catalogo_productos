import { Router } from 'express';

const router = Router();

// Base de datos en memoria (temporal)
let productos = [
  { id: 1, nombre: 'Silvatos de emergencia', precio: 120000, categoria: 'Disuasivos', stock: 10 },
  { id: 2, nombre: 'Llaveros de autodefensa', precio: 450000, categoria: 'Autodefensa', stock: 15 },
  { id: 3, nombre: 'Sprays de defensa personal', precio: 850000, categoria: 'Regulados', stock: 30 }
];

let nextId = 4;

// GET / - Obtener todos
router.get('/', (req, res) => {
  res.json(productos);
});

// GET /:id - Obtener uno por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

// POST / - Crear nuevo
router.post('/', (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }
  const nuevoProducto = {
    id: nextId++,
    nombre,
    precio,
    categoria: categoria || 'general',
    stock: stock || 0
  };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// PUT /:id - Actualizar completo
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }
  productos[index] = { id, nombre, precio, categoria: categoria || productos[index].categoria, stock: stock !== undefined ? stock : productos[index].stock };
  res.json(productos[index]);
});

// DELETE /:id - Eliminar
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  productos.splice(index, 1);
  res.json({ mensaje: 'Producto eliminado correctamente' });
});

export default router;