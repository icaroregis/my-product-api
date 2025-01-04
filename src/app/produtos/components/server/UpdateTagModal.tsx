import { Modal } from '@/components/Modal';
import { getTagById, getTenants } from '@/services/adapter/rest/http';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { UpdateProductForm } from '../client/UpdateProductForm';

type TagProps = {
  id: string;
};

export async function UpdateTagModal({ id }: Readonly<TagProps>) {
  const tenantSlug = cookies().get('tenant_slug')?.value;
  const tenants = await getTenants(tenantSlug!);
  const tenant = tenants.data[0];
  const tag = await getTagById(tenant.slug, id);

  if (!tag) {
    notFound();
  }

  return (
    <Modal
      title="Editar Tag"
      clearParam="updateTagModal"
      className="w-[432px]">
      <UpdateProductForm
        id={id}
        name={tag.name}
        color={tag.color}
      />
    </Modal>
  );
}
