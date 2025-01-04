import { Modal } from '@/components/Modal';
import { UpdateProductForm } from '../client/UpdateProductForm';

type ProductProps = {
  id: string;
};

export async function UpdateProductModal({ id }: Readonly<ProductProps>) {
  // const tag = await getTagById(tenant.slug, id);

  // if (!tag) {
  //   notFound();
  // }

  return (
    <Modal
      title="Editar Tag"
      clearParam="updateTagModal"
      className="w-[432px]">
      <UpdateProductForm
        id={id}
        nome={''}
        preco={''}
        quantidade={''}
      />
    </Modal>
  );
}
