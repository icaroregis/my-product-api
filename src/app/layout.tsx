'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Nunito_Sans as NunitoSans, Ubuntu } from 'next/font/google';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const nunitoSans = NunitoSans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
  adjustFontFallback: false,
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  variable: '--font-ubuntu',
  weight: ['500'],
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={`${nunitoSans.variable} ${ubuntu.variable} font-sans`}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            autoClose={3000}
            position="top-center"
          />
          <header className="flex justify-center items-center h-12 font-medium text-lg bg-gray-800 text-white text-[20px]">
            Sistema de Gerenciamento de Produtos
          </header>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
