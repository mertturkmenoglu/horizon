import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  text: string;
  icon: LucideIcon;
  href: string;
  className?: string;
};

export default function QuickActionCard({
  text,
  icon: Icon,
  href,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'border-midnight/20 rounded-md border px-4 py-3',
        'flex items-center',
        'transition-colors duration-100',
        'hover:border-purple-500 focus:border-none',
        className
      )}
    >
      <Icon className="size-10 rounded-lg bg-purple-200 p-1 text-purple-500" />
      <span className="ml-4 line-clamp-1 text-sm">{text}</span>
    </Link>
  );
}
