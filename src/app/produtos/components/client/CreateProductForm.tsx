'use client';

import { useAuth } from '@/shared/context/AuthContextP';
import { useTenant } from '@/shared/context/TenantContext';
import { updateErrorToast, updateSuccessToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateProductFormData, CreateTagSchema } from '../../specifications/product.schema';
import { createTagAction } from '../../specifications/tag.actions';
import { ProductForm } from './ProductForm';

export function CreateProductForm() {
  const { tenant } = useTenant();
  const { session } = useAuth();
  const { push } = useRouter();
  const pathname = usePathname();
  const methods = useForm<CreateProductFormData>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      color: '#6366F1',
    },
  });

  async function handleSubmitFunction(data: CreateProductFormData, createAnother: boolean, reset: () => void) {
    const toastId = toast.loading('Enviando...');

    const body = {
      ...data,
    };

    const response = await createTagAction(tenant, session?.user!, body);

    if (response.ok) {
      updateSuccessToast(toastId, response.message);
      if (!createAnother) {
        push(pathname);
      } else {
        reset();
      }
    } else {
      updateErrorToast(toastId, response.message);
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
