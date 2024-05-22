import { z } from 'zod';

export const OrderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid product ID' }), // Assuming MongoDB ObjectId
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
});

// TypeScript type derived from the Zod schema
export default OrderValidationSchema;
