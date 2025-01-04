import { Modal } from '@/components/Modal';
import { CreateTaForm } from '../client/CreateProductForm';

export const CreateProductModal = () => {
  return (
    <Modal
      title="Cadastrar Produto"
      clearParam="createProductModal"
      className="w-[432px]">
      <CreateTaForm />
    </Modal>
  );
};
