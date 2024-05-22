import { Schema, Document, Model, model } from 'mongoose';

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
  isDeleted: boolean;
  New: boolean;
};

//export interface TProductDocument extends TProduct, Document {}

export interface ProductModel extends Model<TProduct> {
  isProductInStock(productId: string): Promise<boolean>;
}
