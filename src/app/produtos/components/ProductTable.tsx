'use client';

import { useGetProducts } from '@/server/productsApi';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Product } from '../interfaces/product';

export function ProductTable() {
  const { data, isLoading, error } = useGetProducts();
  const pathname = usePathname();
  const { push } = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const priceBodyTemplate = (rowData: Product) => {
    const convertedNumber = Number(rowData.preco);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(convertedNumber);
  };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-info"
          onClick={() => onEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          onClick={() => onDelete(rowData)}
        />
      </div>
    );
  };

  const onEdit = (product: Product) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('updateProductModal', 'true');
    queryParams.set('updateProductId', String(product.id));
    push(`${pathname}?${queryParams.toString()}`);
  };

  const onDelete = (product: Product) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('deleteProductModal', 'true');
    queryParams.set('deleteProductId', String(product.id));
    push(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <div>
      <DataTable value={data}>
        <Column
          field="id"
          header="ID"></Column>
        <Column
          field="nome"
          header="Nome"></Column>
        <Column
          field="preco"
          header="Preço"
          body={priceBodyTemplate}></Column>
        <Column
          field="quantidade"
          header="Quantidade"></Column>
        <Column
          body={actionBodyTemplate}
          header="Ações"></Column>
      </DataTable>
    </div>
  );
}
