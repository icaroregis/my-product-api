'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { UpdateProductFormData } from '../../specifications/product.schema';
import { ProductForm } from './ProductForm';

type UpdateProductFormProps = {
  id: string;
  nome: string;
  preco: string;
  quantidade: string;
};

export function UpdateProductForm({ id, nome, preco, quantidade }: Readonly<UpdateProductFormProps>) {
  console.log('🚀 ~ UpdateProductForm ~ quantidade:', quantidade);
  console.log('🚀 ~ UpdateProductForm ~ preco:', preco);
  console.log('🚀 ~ UpdateProductForm ~ nome:', nome);
  console.log('🚀 ~ UpdateProductForm ~ id:', id);
  // const { push } = useRouter();
  // const pathname = usePathname();

  const methods = useForm<UpdateProductFormData>({}) as any;

  // const methods = useForm<UpdateProductFormData>({
  //   resolver: zodResolver(UpdateProductSchema),
  //   defaultValues: {
  //     id,
  //     nome,
  //     preco,
  //     quantidade,
  //   },
  // });

  async function handleSubmitFunction(data: UpdateProductFormData) {
    // const toastId = toast.loading('Enviando...');

    const body = {
      nome: data.nome,
      preco: data.preco,
      quantidade: data.quantidade,
    };
    console.log(body);

    // const response = await updateTagAction(tenant, session?.user!, id, body);

    // if (response.ok) {
    //   updateSuccessToast(toastId, response.message);
    //   push(pathname);
    // } else {
    //   updateErrorToast(toastId, response.message);
    // }
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
