import { Modal } from '@/components/Modal';
import { getTagById, getTenants } from '@/services/adapter/rest/http';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { DeleteProductForm } from '../client/DeleteProductForm';

type TagProps = {
  id: string;
};

export const DeleteProductModal = async ({ id }: TagProps) => {
  const tenantSlug = cookies().get('tenant_slug')?.value;
  const tenants = await getTenants(tenantSlug!);
  const tenant = tenants.data[0];
  const tag = await getTagById(tenant.slug, id);

  if (!tag) {
    notFound();
  }

  return (
    <Modal
      title="Desativar Tag"
      clearParam="deleteTagModal"
      className="w-[432px]">
      <DeleteProductForm
        id={id}
        name={tag.name}
      />
    </Modal>
  );
};
