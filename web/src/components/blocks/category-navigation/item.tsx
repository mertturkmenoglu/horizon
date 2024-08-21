import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';

export type Props = React.ComponentPropsWithoutRef<'li'> & {
  href: string;
  category: string;
  text: string;
  img: string;
  icon: LucideIcon;
};

export default function NavItem({
  href,
  category,
  text,
  icon: Icon,
  ...props
}: Props): React.ReactElement {
  return (
    <li {...props}>
      <Link
        href={encodeURI(href)}
        className={cn(
          'flex flex-col items-center p-1',
          'transition-all duration-200',
          'group border-b-2 border-b-transparent hover:border-b-primary',
          'text-muted-foreground'
        )}
      >
        <Icon className="size-6 group-hover:text-primary" />
        <span className="mt-1 line-clamp-1 text-center group-hover:text-primary">
          {text}
        </span>
      </Link>
    </li>
  );
}
