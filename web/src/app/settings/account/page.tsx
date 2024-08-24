import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Form from './_components/form';

export default async function Page() {
  const auth = await getAuth();

  if (!auth) {
    redirect('/sign-in');
  }

  return (
    <div>
      <Form
        id={auth.data.id}
        username={auth.data.username}
        email={auth.data.email}
      />
    </div>
  );
}
