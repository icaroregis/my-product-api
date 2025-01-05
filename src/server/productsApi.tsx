'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../app/produtos/interfaces/product';

export interface UpdateProductData {
  id: string;
  data: Partial<Omit<Product, 'id'>>;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const { data } = await api.get<Product>(`/products/${id}`);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Erro ao buscar produto:', error.response?.data);
          throw new Error(error.response?.data?.message || 'Falha ao buscar produto');
        }
        throw error;
      }
    },

    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/products');
        return data.map((product: Product) => ({
          id: product.id,
          nome: product.nome,
          preco: product.preco,
          quantidade: product.quantidade,
        }));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data);
          throw new Error(error.response?.data?.message || 'Failed to fetch products');
        }
        throw error;
      }
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id'>) => {
      const { data } = await api.post('/products', newProduct);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Erro ao criar produto:', error);
      throw error;
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateProductData) => {
      const response = await api.patch(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
        if (!oldData) return undefined;
        return oldData.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    },
  });
};
