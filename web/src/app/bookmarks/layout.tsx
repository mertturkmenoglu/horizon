import { Separator } from '@/components/ui/separator';
import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  const auth = await getAuth();
  const isSignedIn = auth !== null;

  if (!isSignedIn) {
    redirect('/sign-in');
  }

  return (
    <main className="container my-16">
      <h2 className="scroll-m-20 text-4xl font-extrabold capitalize tracking-tight">
        Your Bookmarks
      </h2>
      <Separator className="my-4" />
      <div>{children}</div>
    </main>
  );
}
