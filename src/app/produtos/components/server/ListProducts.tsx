import { getMe, getTenants } from '@/services/adapter/rest/http';
import { cookies } from 'next/headers';
import { getInitialTagAction } from '../../specifications/tag.actions';
import { ProductTable } from '../client/ProductTable';

interface ListTagProps {
  filterParam: {
    query: string;
    queryWithoutPage: string;
  };
}

export async function ListProducts({ filterParam }: Readonly<ListTagProps>) {
  const tenantSlug = cookies().get('tenant_slug')?.value;
  const tenants = await getTenants(tenantSlug!);
  const tenant = tenants.data[0];
  const me = await getMe(tenant.slug);
  const tags = await getInitialTagAction(tenant, me!, filterParam.query);

  return (
    <ProductTable
      data={tags.data}
      paginationControls={tags.paginationControls}
      search={filterParam.queryWithoutPage}
    />
  );
}
