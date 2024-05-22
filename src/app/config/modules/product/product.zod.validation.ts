import { z } from 'zod';

export const VariantSchema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});
export const InventorySchema = z.object({
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});
export const ProductValidationSchema = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().nonnegative(),
  category: z.string().nonempty(),
  tags: z.array(z.string().nonempty()),
  variants: z.array(VariantSchema),
  inventory: InventorySchema,
  isDeleted: z.boolean().optional().default(false),
  New: z.boolean().optional().default(false),
});

export default ProductValidationSchema;
