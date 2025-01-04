import { Modal } from '@/components/Modal';
import { UpdateProductForm } from '../client/UpdateProductForm';

type ProductProps = {
  id: string;
};

export async function UpdateProductModal({ id }: Readonly<ProductProps>) {
  const initialData = {
    id,
    nome: '',
    preco: '',
    quantidade: '',
  };

  return (
    <Modal
      title="Editar Tag"
      clearParam="updateProductModal"
      className="w-[432px]">
      <UpdateProductForm {...initialData} />
    </Modal>
  );
}
