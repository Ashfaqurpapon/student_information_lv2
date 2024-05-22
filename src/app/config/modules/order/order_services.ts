import Order from './order_model';
import { IOrder } from './order_interface';

//
//
//
//
//Crete order
//
//
//
const createOrderInDB = async (orderData: IOrder) => {
  const order = await Order.findOne({ email: orderData.email });
  if (order) {
    throw new Error('Order already exists!');
  }
  const result = await Order.create(orderData);
  return result;
};
//
//
//
//Get All Order From BD By Email and Products
//
//
//

const getAllOrdersFromDB = async (email?: string) => {
  let query = {}; // Initialize an empty query object

  if (email) {
    const regex = new RegExp(email); // 'i' for case-insensitive search
    query = {
      email: { $regex: regex },
    };
  }
  const result = await Order.find(query);
  if (result.length === 0) {
    throw new Error('Order not found');
  }
  return result;
};
//
//
//
//
export const OrderService = {
  createOrderInDB,
  getAllOrdersFromDB,
};
