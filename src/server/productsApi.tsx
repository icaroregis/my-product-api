'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../app/produtos/interfaces/product';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

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
