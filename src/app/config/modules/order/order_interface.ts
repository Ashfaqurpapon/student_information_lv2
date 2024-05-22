import { Document, Schema, model, Model } from 'mongoose';

export type IOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};
export interface IOrderModel extends Model<IOrder> {}
