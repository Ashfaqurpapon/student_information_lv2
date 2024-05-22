import { Schema, model } from 'mongoose';
import { IOrder, IOrderModel } from './order_interface';

const OrderSchema = new Schema<IOrder, IOrderModel>({
  email: {
    type: String,
    required: [true, 'must be provide valid email'],
    unique: true,
  },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Mongoose model for order
const Order = model<IOrder, IOrderModel>('Order', OrderSchema);

export default Order;
