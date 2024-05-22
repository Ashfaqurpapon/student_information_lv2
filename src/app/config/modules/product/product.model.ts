import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../..';
import {
  TInventory,
  TVariant,
  ProductModel,
  //TProductDocument,
  TProduct,
} from './product.interface';

const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const ProductSchema = new Schema<TProduct, ProductModel>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  New: {
    type: Boolean,
    default: false,
  },
});
ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

ProductSchema.statics.isProductInStock = async function (
  productId: string,
): Promise<boolean> {
  const product = await this.findById(productId).select('inventory').exec();
  return product ? product.inventory.inStock : false;
};

const Product = model<TProduct, ProductModel>('Product', ProductSchema);

export default Product;
