import express from 'express';
import { ProductControllers } from './product.controller';
import { OrderControllers } from '../order/order_controller';

const router = express.Router();

router.post('/api/products', ProductControllers.createProduct);

router.get('/api/products', ProductControllers.getAllProducts); // Route for /products with searchTerm
//router.get('/api/products', ProductControllers.getAllProducts); //all products

router.get('/api/products/:productId', ProductControllers.getSingleProduct);

router.delete('/api/products/:productId', ProductControllers.deleteProduct);

router.put('/api/products/:productId', ProductControllers.updateProduct);

export const ProductRoutes = router;
