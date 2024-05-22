import { string } from 'joi';
import Product from './product.model';
import { TProduct } from './product.interface';

//** */
//
//product create in MongoDB
//
//
//
//** */
const createProductIntoDB = async (productData: TProduct) => {
  const existingProduct = await Product.findOne({ name: productData.name });
  if (existingProduct) {
    throw new Error('Product already exists!');
  }

  const result = await Product.create(productData);
  return result;
};

const isProductInStock = async (productId: string): Promise<boolean> => {
  return await Product.isProductInStock(productId);
};
//**
//
//
//
//
//Here getAllProductFromBD find the data accordingly querys.
//
//
//
//
//**
const getAllProductsFromDB = async (searchTerm?: string) => {
  let query = {}; // Initialize an empty query object

  // If a searchTerm is provided, construct a query for searching
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search
    query = {
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
        { tags: { $regex: regex } },
      ],
    };
  }

  const result = await Product.find(query);
  return result;
};
//**
//
//
//
//getSingleProductFromDB
//
//
//
//** */

const getSingleProductFromDB = async (id: string) => {
  console.log(id);

  const result = await Product.findOne({ _id: id, isDeleted: false }).exec();
  if (!result) {
    throw new Error('Product not found!');
  }
  return result;
};
//**
//
//
//
//
//DeleteProductFromDB
//
//
//
//**

const deleteProductFromDB = async (id: string) => {
  const result = await Product.updateOne({ id }, { isDeleted: true });
  return result;
};
//**
//
//
//
//
//UpdateProductInDB
//
//
//
//**

const updateProductInDB = async (
  productId: string,
  updateData: Partial<TProduct>,
) => {
  console.log(productId);

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found!');
  }
  //console.log(product);

  if (updateData.inventory?.inStock && product.inventory.inStock) {
    // If both the existing product and the update have inStock as true
    // Decrease the quantity by the difference between the new and old quantities
    const quantityDifference = updateData.inventory.quantity - 1;
    updateData.inventory.quantity = Math.max(0, quantityDifference);
    // Ensure quantity is non-negative
    if (updateData.inventory.quantity === 0)
      updateData.inventory.inStock = false;
  } else throw new Error('Insufficient quantity available in inventory');

  const result = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
  });
  if (!result) {
    throw new Error('Product not found!');
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  isProductInStock,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
};
