'use client';

import { Modal } from '@/components/Modal';
import { useGetProductById } from '@/server/productsApi';
import { UpdateProductForm } from './UpdateProductForm';

type ProductProps = {
  id: string;
};

export function UpdateProductModal({ id }: Readonly<ProductProps>) {
  const { data, isLoading, error, isError } = useGetProductById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span>Carregando produto...</span>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Erro ao carregar produto: {error.message}</div>;
  }

  if (!data) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <Modal
      title="Editar Tag"
      clearParam="updateProductModal"
      className="w-[432px]">
      <UpdateProductForm data={data} />
    </Modal>
  );
}
