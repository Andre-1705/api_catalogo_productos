import db from '../config/firebase.js';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Product } from '../models/products.model.js';

const productosRef = collection(db, 'products');

// Obtener todos los productos
export const getAll = async () => {
  const snapshot = await getDocs(productosRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Obtener un producto por ID
export const getById = async (id) => {
  const docSnap = await getDoc(doc(db, 'products', id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};

// Crear un nuevo producto
export const create = async (data) => {
  const producto = new Product(data);
  const docRef = await addDoc(productosRef, { ...producto });
  return { id: docRef.id, ...producto };
};

// Actualizar un producto completo
export const update = async (id, data) => {
  const producto = new Product(data);
  await updateDoc(doc(db, 'products', id), { ...producto });
  return { id, ...producto };
};

// Eliminar un producto
export const remove = async (id) => {
  await deleteDoc(doc(db, 'products', id));
  return true;
};