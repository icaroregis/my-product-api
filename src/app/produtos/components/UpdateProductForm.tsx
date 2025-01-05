'use client';

import { useUpdateProduct } from '@/server/productsApi';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatarValor } from '@/utils/formatValues';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Product } from '../interfaces/product';
import { UpdateProductFormData, UpdateProductSchema } from '../specifications/product.schema';
import { ProductForm } from './ProductForm';

type UpdateProductFormProps = {
  data: Product;
};

export function UpdateProductForm({ data }: Readonly<UpdateProductFormProps>) {
  const { push } = useRouter();
  const pathname = usePathname();

  const methods = useForm<UpdateProductFormData>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id: String(data.id),
      nome: data.nome,
      preco: formatCurrency(data.preco, true),
      quantidade: data.quantidade,
    },
  });

  const updateProduct = useUpdateProduct();

  async function handleSubmitFunction(data: UpdateProductFormData) {
    try {
      const newPrice = formatarValor(data.preco);
      await updateProduct.mutateAsync({
        id: data.id,
        data: {
          nome: data.nome,
          preco: newPrice,
          quantidade: data.quantidade,
        },
      });
      toast.success('Produto atualizado com sucesso');
      push(pathname);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  }

  return (
    <FormProvider {...methods}>
      <ProductForm
        handleSubmitFunction={handleSubmitFunction}
        type="update"
      />
    </FormProvider>
  );
}
