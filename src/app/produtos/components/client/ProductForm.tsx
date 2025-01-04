'use client';

import { CancelFormButton } from '@/components/Buttons/CancelFormButton';
import { SubmitFormButton } from '@/components/Buttons/SubmitFormButton';
import { InputField } from '@/components/Inputs/InputField';
import { sleep } from '@/utils/sleep';
import { usePathname, useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateProductFormData, UpdateProductFormData } from '../../specifications/product.schema';

type ProductFormPropsCreate = {
  handleSubmitFunction: (data: CreateProductFormData, createAnother: boolean, reset: () => void) => Promise<void>;
  type: 'create';
};

type ProductFormPropsUpdate = {
  handleSubmitFunction: (data: UpdateProductFormData) => Promise<void>;
  type: 'update';
};

type IProductFormProps = ProductFormPropsCreate | ProductFormPropsUpdate;

export function ProductForm({ handleSubmitFunction, type }: Readonly<IProductFormProps>) {
  const pathname = usePathname();
  const { push } = useRouter();
  const [createAnother, setCreateAnother] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    // setValue,
    reset,
    control,
    formState: { isSubmitting },
  } = useFormContext<CreateProductFormData | UpdateProductFormData>();
  const values = watch();
  console.log('🚀 ~ ProductForm ~ values:', values);

  const leaveProductForm = () => {
    push(pathname);
  };

  async function handleSubmitFormData(
    data: CreateProductFormData | UpdateProductFormData,
    e?: BaseSyntheticEvent<object, unknown, unknown>,
  ) {
    e?.preventDefault();

    if (type === 'create') {
      await handleSubmitFunction(data as CreateProductFormData, createAnother, reset);
    }

    if (type === 'update') {
      await handleSubmitFunction(data as UpdateProductFormData);
    }

    await sleep();
  }

  return (
    <form
      id="tag-form"
      onSubmit={handleSubmit(handleSubmitFormData)}>
      <div className="flex flex-col mb-4">
        <InputField
          label="Nome"
          control={control}
          {...register('nome')}
          required
        />
      </div>

      <div className="flex flex-col mb-4">
        <InputField
          label="Preço"
          control={control}
          {...register('preco')}
          required
          formatForCurrency
        />
      </div>

      <div className="flex flex-col mb-4">
        <InputField
          label="Quantidade"
          control={control}
          {...register('quantidade')}
          required
        />
      </div>

      <div className="flex justify-end items-center gap-4 mt-10 mb-2">
        <CancelFormButton
          title="Fechar"
          handleCancel={leaveProductForm}
          disabled={isSubmitting}
        />

        <SubmitFormButton
          handleClick={setCreateAnother}
          classNameMain={type === 'create' ? 'flex gap-[1.5px]' : undefined}
          variant={type === 'create' ? 'successWithMore' : 'primary'}
          isSubmitting={isSubmitting}
          addButton={type === 'create'}
        />
      </div>
    </form>
  );
}
