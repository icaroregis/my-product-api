'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../app/produtos/interfaces/product';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('/products');
      return data;
    },
  });
};
