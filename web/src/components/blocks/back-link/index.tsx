import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  className?: string;
  href: string;
  text?: string;
};

export default function BackLink({
  href,
  className,
  text = 'Go back',
}: Readonly<Props>) {
  return (
    <Link
      href={href}
      className={cn(className)}
    >
      <Button
        variant="link"
        className="px-0"
        asChild
      >
        <div className="flex items-center gap-2">
          <ArrowLeft className="size-4" />
          <div>{text}</div>
        </div>
      </Button>
    </Link>
  );
}
