'use client';

import { Modal } from '@/components/Modal';
import { useGetProductById } from '@/server/productsApi';
import { DeleteProductForm } from './DeleteProductForm';

type ProductProps = {
  id: string;
};

export function DeleteProductModal({ id }: Readonly<ProductProps>) {
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
      title="Desativar Produto"
      clearParam="deleteProductModal"
      className="w-[432px]">
      <DeleteProductForm
        id={String(data.id)}
        name={data.nome}
      />
    </Modal>
  );
}
