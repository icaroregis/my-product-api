'use client';

import { CancelFormButton } from '@/components/Buttons/CancelFormButton';
import { SubmitFormButton } from '@/components/Buttons/SubmitFormButton';
import { useAuth } from '@/shared/context/AuthContextP';
import { useTenant } from '@/shared/context/TenantContext';
import { sleep } from '@/utils/sleep';
import { updateErrorToast, updateSuccessToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DeleteProductFormData, DeleteProductSchema } from '../../specifications/product.schema';
import { deleteTagAction } from '../../specifications/tag.actions';

type DeleteProductFormProps = {
  id: string;
  name: string;
};

export function DeleteProductForm({ id, name }: Readonly<DeleteProductFormProps>) {
  const { tenant } = useTenant();
  const { session } = useAuth();
  const { push } = useRouter();
  const pathname = usePathname();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DeleteProductFormData>({
    resolver: zodResolver(DeleteProductSchema),
    defaultValues: {
      id,
    },
  });

  const handleCloseModal = () => {
    push(pathname);
  };

  async function handleDeleteTag(data: DeleteProductFormData) {
    const toastId = toast.loading('Desativando...');
    const response = await deleteTagAction(tenant, session?.user!, data.id);

    if (response.ok) {
      updateSuccessToast(toastId, response.message);
      push(pathname);
    } else {
      updateErrorToast(toastId, response.message);
    }

    await sleep();
  }

  return (
    <form
      onSubmit={handleSubmit(handleDeleteTag)}
      className="flex flex-col items-center justify-center gap-6">
      <div>
        <p className="text-start">
          Você está prestes a desativar a Tag: <strong>{name}</strong>.{' '}
          <span className="text-start">Tem certeza disso?</span>
        </p>
      </div>
      <div className="flex items-center justify-end w-full gap-4 mb-2">
        <CancelFormButton handleCancel={handleCloseModal} />
        <SubmitFormButton
          isSubmitting={isSubmitting}
          variant="warning"
          title="Desativar"
        />
      </div>
    </form>
  );
}
