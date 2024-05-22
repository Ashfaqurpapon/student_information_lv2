import { Request, Response } from 'express';
import { ProductServices } from './product_service';
import ProductValidationSchema from './product.zod.validation';
// **
//
//create products in mongoDB
//
//
//**

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body.product;

    // Validate using Zod
    const validatedData = ProductValidationSchema.parse(productData);

    // Create the product in the DB
    const result = await ProductServices.createProductIntoDB(validatedData);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
//**
//
//
//
//
//Get All Product with different route like Name or ALLproduct
//
//
//
//**

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm: string };

    let result;

    result = await ProductServices.getAllProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'All products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};
//**
//
//
//
//GetSingleProduct
//
//
//
//**

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    //console.log(result);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};
//**
//
//
//
//DeleteProduct
//
//
//**
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product is deleted succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
//**
//
//
//
//
//updateProduct
//
//
//**
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    //console.log(updateData);

    // Validate using Zod
    const validatedData = ProductValidationSchema.partial().parse(updateData); // Allow partial updates

    // Update the product in the DB
    const result = await ProductServices.updateProductInDB(
      productId,
      validatedData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
