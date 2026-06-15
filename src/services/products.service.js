import { Product } from '../models/products.model.js';

// Base de datos en memoria (temporal)
let productos = [
  { id: 1, nombre: 'Silvatos de emergencia', precio: 120000, categoria: 'Disuasivos', stock: 10 },
  { id: 2, nombre: 'Llaveros de autodefensa', precio: 450000, categoria: 'Autodefensa', stock: 15 },
  { id: 3, nombre: 'Sprays de defensa personal', precio: 850000, categoria: 'Regulados', stock: 30 }
];

let nextId = 4;

// Obtener todos los productos
export const getAll = () => {
  return productos;
};

// Obtener un producto por ID
export const getById = (id) => {
  return productos.find(p => p.id === id) || null;
};

// Crear un nuevo producto
export const create = (data) => {
  const producto = new Product(data);
  const nuevoProducto = { id: nextId++, ...producto };
  productos.push(nuevoProducto);
  return nuevoProducto;
};

// Actualizar un producto completo
export const update = (id, data) => {
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return null;
  const producto = new Product(data);
  productos[index] = { id, ...producto };
  return productos[index];
};

// Eliminar un producto
export const remove = (id) => {
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return false;
  productos.splice(index, 1);
  return true;
};