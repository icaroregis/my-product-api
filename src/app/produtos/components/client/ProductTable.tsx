/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CustomTableHeader } from '@/components/CustomTableHeader';
import { StandardInfiniteScroll } from '@/components/StandardInfiniteScroll';
import { Tag } from '@/services/domain/rest/models';
import { PaginationControls } from '@/services/domain/rest/models/paginationControls.type';
import { ColumnDef } from '@tanstack/react-table';
import { usePathname, useRouter } from 'next/navigation';
import { getTagsAction } from '../../specifications/tag.actions';
import { DeleteTagCell, TagNameCell } from '../tableCell/TableCells';

type SectorTableProps = {
  data: Tag[];
  paginationControls: PaginationControls;
  search?: string;
};

export function ProductTable({ data, paginationControls, search }: Readonly<SectorTableProps>) {
  const pathname = usePathname();
  const { push } = useRouter();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: () => CustomTableHeader('Nome'),
      cell: TagNameCell as any,
    },
    { id: 'Delete', header: '', cell: DeleteTagCell as any },
  ];

  function handleRowClick(original: Tag) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('updateTagModal', 'true');
    queryParams.set('updateTagId', original.id);
    push(`${pathname}?${queryParams.toString()}`);
  }

  return (
    <StandardInfiniteScroll
      data={data}
      columns={columns}
      lastPage={paginationControls.lastPage}
      fetchDataFunction={getTagsAction}
      search={search}
      handleRowClick={handleRowClick}
    />
  );
}
