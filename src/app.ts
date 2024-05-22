import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { ProductRoutes } from './app/config/modules/product/product_route';
import { OrderRoutes } from './app/config/modules/order/order_route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application route
app.use('/api/v1/students', ProductRoutes);
app.use('/api/v1/students', OrderRoutes);
//
//
//
//
//
//handle error
//
//
//
//

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
