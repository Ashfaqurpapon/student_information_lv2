import { Request, Response } from 'express';
import { OrderService } from './order_services';
import OrderValidationSchema from './order_zod_validation';
//
//
//
//
//CreateOrder
//
//
//
//
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body.order;
    const validatedData = OrderValidationSchema.parse(orderData);
    const result = await OrderService.createOrderInDB(validatedData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//
//
//
//
//
//
//GetAllOrder
//
//
//
//
//
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email?: string };

    let result;

    result = await OrderService.getAllOrdersFromDB(email);
    //console.log(result);

    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'All products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'order  not found',
    });
  }
};
//
//
//
//
export const OrderControllers = {
  createOrder,
  getAllOrders,
};
