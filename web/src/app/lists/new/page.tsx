import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewListForm from './_components/form';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const auth = await getAuth();
  const isSignedIn = auth !== null;

  if (!isSignedIn) {
    redirect('/sign-in');
  }

  return (
    <div>
      <NewListForm />
    </div>
  );
}
