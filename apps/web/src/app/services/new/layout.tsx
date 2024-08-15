import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  const auth = await getAuth();

  if (auth === null) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
