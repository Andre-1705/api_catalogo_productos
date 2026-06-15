import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productsRouter from './src/routes/products.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/productos', productsRouter);

// GET / - Ruta raiz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Catalogo de Productos', estado: 'corriendo' });
});

// 404 para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});