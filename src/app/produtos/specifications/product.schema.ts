import { z } from 'zod';

const required = 'Item Obrigatório';

const ProductSchema = z.object({
  id: z.string(),
  nome: z.string({ required_error: required }),
  preco: z.string({ required_error: required }),
  quantidade: z.string({ required_error: required }),
});

export const CreateProductSchema = ProductSchema.omit({
  id: true,
});

export type CreateProductFormData = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = ProductSchema;

export type UpdateProductFormData = z.infer<typeof UpdateProductSchema>;

export const DeleteProductSchema = ProductSchema.pick({
  id: true,
});

export type DeleteProductFormData = z.infer<typeof DeleteProductSchema>;
