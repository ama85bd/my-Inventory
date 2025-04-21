import { Router } from 'express';
import { createProduct, getProducts } from '../controller/productController';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);

export default router;
