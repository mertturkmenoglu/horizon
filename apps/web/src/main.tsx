import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Toaster } from './components/Toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import { HelmetProvider } from 'react-helmet-async';

const root = document.getElementById('root');
const client = new QueryClient();

if (!root) {
  throw new Error('Root not found');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <HelmetProvider>
        <AuthContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
          <Toaster />
        </AuthContextProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
