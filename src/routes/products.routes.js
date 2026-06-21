import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { validateToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Rutas protegidas (requieren token)
router.post('/create', validateToken,createProduct);
router.put('/:id', validateToken, updateProduct);
router.delete('/:id', validateToken,deleteProduct);

export default router;