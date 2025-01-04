import { z } from 'zod';

const required = 'Item Obrigatório';
const limit = 'Excedeu o número máximo de caracteres';

const ProductSchema = z.object({
  id: z.string(),
  nome: z.string({ required_error: required }).min(1, required).max(128, limit),
  preco: z.string(),
  quantidade: z.string(),
});

export const CreateTagSchema = ProductSchema.omit({
  id: true,
});

export type CreateProductFormData = z.infer<typeof CreateTagSchema>;

export const UpdateProductSchema = ProductSchema;

export type UpdateProductFormData = z.infer<typeof UpdateProductSchema>;

export const DeleteProductSchema = ProductSchema.pick({
  id: true,
});

export type DeleteProductFormData = z.infer<typeof DeleteProductSchema>;
