import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/Toaster';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import './i18n';
import './index.css';
import { router } from './router';
import { PageContextProvider } from './contexts/PageContextProvider';

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
          <PageContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={router} />
            <Toaster />
          </PageContextProvider>
        </AuthContextProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
