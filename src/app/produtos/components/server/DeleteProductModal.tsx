import { Modal } from '@/components/Modal';
import { DeleteProductForm } from '../client/DeleteProductForm';

type ProductProps = {
  id: string;
};

export const DeleteProductModal = async ({ id }: ProductProps) => {
  return (
    <Modal
      title="Desativar Produto"
      clearParam="deleteProductModal"
      className="w-[432px]">
      <DeleteProductForm
        id={id}
        name={''}
      />
    </Modal>
  );
};
