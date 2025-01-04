import { Modal } from '@/components/Modal';
import { DeleteProductForm } from '../client/DeleteProductForm';

type ProductProps = {
  id: string;
};

export const DeleteProductModal = async ({ id }: ProductProps) => {
  // const tag = await getTagById(tenant.slug, id);

  // if (!tag) {
  //   notFound();
  // }

  return (
    <Modal
      title="Desativar Produto"
      clearParam="deleteTagModal"
      className="w-[432px]">
      <DeleteProductForm
        id={id}
        name={''}
      />
    </Modal>
  );
};
