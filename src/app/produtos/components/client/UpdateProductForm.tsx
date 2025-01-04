'use client';

import { useAuth } from '@/shared/context/AuthContextP';
import { useTenant } from '@/shared/context/TenantContext';
import { updateErrorToast, updateSuccessToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpdateProductFormData, UpdateProductSchema } from '../../specifications/product.schema';
import { updateTagAction } from '../../specifications/tag.actions';
import { ProductForm } from './ProductForm';

type UpdateProductFormProps = {
  id: string;
  name: string;
  color: string;
};

export function UpdateProductForm({ id, name, color }: Readonly<UpdateProductFormProps>) {
  const { tenant } = useTenant();
  const { session } = useAuth();
  const { push } = useRouter();
  const pathname = usePathname();

  const methods = useForm<UpdateProductFormData>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id,
      name,
      color,
    },
  });

  async function handleSubmitFunction(data: UpdateProductFormData) {
    const toastId = toast.loading('Enviando...');

    const body = {
      name: data.name,
      color: data.color,
    };

    const response = await updateTagAction(tenant, session?.user!, id, body);

    if (response.ok) {
      updateSuccessToast(toastId, response.message);
      push(pathname);
    } else {
      updateErrorToast(toastId, response.message);
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
