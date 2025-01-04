import { Modal } from '@/components/Modal';
import { CreateProductForm } from '../client/CreateProductForm';

export const CreateProductModal = () => {
  return (
    <Modal
      title="Cadastrar Produto"
      clearParam="createProductModal"
      className="w-[432px]">
      <CreateProductForm />
    </Modal>
  );
};
