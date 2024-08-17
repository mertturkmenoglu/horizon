import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getAuth } from '@/lib/auth';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import MyHServices from './_components/my-hservices';

export default async function Page() {
  const auth = await getAuth();

  if (auth === null) {
    redirect('/sign-in');
  }

  return (
    <div className="container my-16">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 text-xl font-medium tracking-tight lg:text-2xl">
          Services
        </h2>
        <Button
          variant="default"
          className="my-2"
          asChild
        >
          <div className="flex items-center gap-2">
            <Link href="/services/new">Create New Service</Link>
            <Plus className="size-4" />
          </div>
        </Button>
      </div>
      <Separator />
      <MyHServices className="my-16" />
    </div>
  );
}
