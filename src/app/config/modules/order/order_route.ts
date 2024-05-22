import express from 'express';
import { OrderControllers } from '../order/order_controller';

const router = express.Router();

router.post('/api/orders', OrderControllers.createOrder);
router.get('/api/orders', OrderControllers.getAllOrders);

export const OrderRoutes = router;
