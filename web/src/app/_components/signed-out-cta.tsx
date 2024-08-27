import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  className?: string;
};

export default function SignedOutCta({ className }: Readonly<Props>) {
  return (
    <div className={cn('mx-auto my-24 max-w-5xl', className)}>
      <h2 className="scroll-m-20 text-3xl font-medium tracking-tight lg:text-4xl">
        Get started by listing your services
      </h2>
      <p className="mt-2 text-lg text-muted-foreground">
        Whether you are a client looking for someone to take care of a job, or
        you are a service provider trying to extend your business,{' '}
        <span className="text-sky-500">Horizon</span> can help you.
      </p>
      <Link href="/sign-in">
        <Button
          asChild
          className="mt-8 bg-purple-600 hover:bg-purple-600/90"
        >
          <div className="flex items-center gap-2">
            <div>Get started</div>
            <ArrowRight className="size-4" />
          </div>
        </Button>
      </Link>
    </div>
  );
}
