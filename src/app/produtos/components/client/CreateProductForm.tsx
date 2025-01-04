'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateProductFormData, CreateTagSchema } from '../../specifications/product.schema';
import { ProductForm } from './ProductForm';

export function CreateProductForm() {
  // const { push } = useRouter();
  // const pathname = usePathname();
  const methods = useForm<CreateProductFormData>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      nome: '',
      preco: '',
      quantidade: '',
    },
  });

  async function handleSubmitFunction(data: CreateProductFormData, createAnother: boolean, reset: () => void) {
    console.log(createAnother);
    console.log(reset);

    const body = {
      ...data,
    };

    console.log(body);
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
