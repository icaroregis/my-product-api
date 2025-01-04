'use client';

import { useGetProducts } from '@/service/productApi';
import { ProductTable } from '../client/ProductTable';

export function ListProducts() {
  const { data: products, isLoading, error } = useGetProducts();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar produtos</div>;
  }

  return <ProductTable data={products || []} />;
}
