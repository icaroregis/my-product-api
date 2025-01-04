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
      color: '#6366F1',
    },
  });

  async function handleSubmitFunction(data: CreateProductFormData, createAnother: boolean, reset: () => void) {
    // const toastId = toast.loading('Enviando...');
    console.log(createAnother);
    console.log(reset);

    const body = {
      ...data,
    };

    console.log(body);

    // const response = await createTagAction(tenant, session?.user!, body);

    // if (response.ok) {
    //   updateSuccessToast(toastId, response.message);
    //   if (!createAnother) {
    //     push(pathname);
    //   } else {
    //     reset();
    //   }
    // } else {
    //   updateErrorToast(toastId, response.message);
    // }
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
