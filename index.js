import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

//Instanciamos Express
const app = express();

//Middlewares iniciales para manejar CORS y parsear JSON
app.use(cors());
app.use(bodyParser.json());

// Base de datos en memoria (temporal, en etapas posteriores usaremos Firebase)
let productos = [
  { id: 1, nombre: 'Silvatos de emergencia', precio: 120000, categoria: 'Disuasivos', stock: 10 },
  { id: 2, nombre: 'Llaveros de autodefensa', precio: 450000, categoria: 'Autodefensa', stock: 15 },
  { id: 3, nombre: 'Sprays de defensa personal', precio: 850000, categoria: 'Regulados', stock: 30 }
];

let nextId = 4;

// RUTAS DE PRODUCTOS

// GET /productos - Obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// GET /productos/:id - Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

// POST /productos - Crear un nuevo producto
app.post('/productos', (req, res) => {
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

// PUT /productos/:id - Actualizar un producto completo
app.put('/productos/:id', (req, res) => {
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

// DELETE /productos/:id - Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  productos.splice(index, 1);
  res.json({ mensaje: 'Producto eliminado correctamente' });
});

// GET / - Ruta raiz de bienvenida
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Catalogo de Productos', estado: 'corriendo' });
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});