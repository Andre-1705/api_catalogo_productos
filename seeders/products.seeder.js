import db from '../src/config/firebase.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Product } from '../src/models/products.model.js';

const productosRef = collection(db, 'products');

const productosIniciales = [
  { nombre: 'Silvatos de emergencia', precio: 120000, categoria: 'Disuasivos', stock: 10 },
  { nombre: 'Llaveros de autodefensa', precio: 450000, categoria: 'Autodefensa', stock: 15 },
  { nombre: 'Sprays de defensa personal', precio: 850000, categoria: 'Regulados', stock: 30 }
];

const seed = async () => {
  try {
    // Verificar si ya hay productos
    const snapshot = await getDocs(productosRef);
    if (!snapshot.empty) {
      console.log('Ya existen productos en la base de datos. No se agregaron nuevos.');
      return;
    }

    // Cargar productos iniciales
    for (const data of productosIniciales) {
      const producto = new Product(data);
      await addDoc(productosRef, { ...producto });
    }
    console.log('Se cargaron 3 productos correctamente.');
  } catch (error) {
    console.error('Error al cargar productos:', error.message);
  }
};

seed();