'use client';

import { useCreateProduct } from '@/server/productsApi';
import { formatarValor } from '@/utils/formatValues';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateProductFormData, CreateTagSchema } from '../specifications/product.schema';
import { ProductForm } from './ProductForm';

export function CreateProductForm() {
  const { push } = useRouter();
  const pathname = usePathname();
  const methods = useForm<CreateProductFormData>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      nome: '',
      preco: '',
      quantidade: '',
    },
  });

  const createProduct = useCreateProduct();

  async function handleSubmitFunction(data: CreateProductFormData, createAnother: boolean, reset: () => void) {
    try {
      const newPrice = formatarValor(data.preco);
      const response = await createProduct.mutateAsync({
        nome: data.nome,
        preco: String(newPrice),
        quantidade: data.quantidade,
      });

      if (response) {
        toast.success('Produto criado com sucesso');
        if (!createAnother) {
          push(pathname);
        } else {
          reset();
        }
      } else {
        toast.error('Erro ao criar produto');
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  }

  return (
    <FormProvider {...methods}>
      <ProductForm
        handleSubmitFunction={handleSubmitFunction}
        type="create"
      />
    </FormProvider>
  );
}
