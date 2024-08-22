import Footer from '@/components/blocks/footer';
import Header from '@/components/blocks/header';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import AuthContextProvider from '@/providers/auth';
import QClientProvider from '@/providers/query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Horizon',
  description: 'Horizon service provider and discovery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <QClientProvider>
          <AuthContextProvider>
            <Header />
            <main>{children}</main>
            <ReactQueryDevtools />
            <Toaster richColors />
            <Footer />
          </AuthContextProvider>
        </QClientProvider>
      </body>
    </html>
  );
}
