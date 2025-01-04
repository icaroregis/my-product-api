'use client';

import { Product } from '../../interfaces/product';

type SectorTableProps = {
  data: Product[];
};

export function ProductTable({ data }: Readonly<SectorTableProps>) {
  console.log('🚀 ~ ProductTable ~ data:', data);
  // const pathname = usePathname();
  // const { push } = useRouter();

  // function handleRowClick(original: Tag) {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   queryParams.set('updateTagModal', 'true');
  //   queryParams.set('updateTagId', original.id);
  //   push(`${pathname}?${queryParams.toString()}`);
  // }

  return (
    <div>
      <h1>Aqui será renderizado a tabela</h1>
    </div>
  );
}
