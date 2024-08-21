import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Sidebar from './_components/sidebar';

export default async function Layout({ children }: PropsWithChildren) {
  const auth = await getAuth();
  const isSignedIn = auth !== null;

  if (!isSignedIn) {
    redirect('/signin');
  }

  return (
    <div className="container my-16 flex flex-1 flex-col gap-4 md:gap-8">
      <div className="mx-auto grid w-full gap-2">
        <h2 className="text-3xl font-semibold">Settings</h2>
      </div>
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <Sidebar />
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  );
}
