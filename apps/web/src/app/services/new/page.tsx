import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import NewServiceForm from './_components/form';

export default async function Page() {
  return (
    <div className="container my-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/services">
          <Button
            variant="link"
            className="px-0"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              <div>Go back</div>
            </div>
          </Button>
        </Link>
        <h2 className="mt-4 scroll-m-20 text-3xl font-medium tracking-tight lg:text-4xl">
          Create New Service
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          You can list a service you provide. Make sure you enter correct
          information.
        </p>
      </div>
      <NewServiceForm />
    </div>
  );
}
