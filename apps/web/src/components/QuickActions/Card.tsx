import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export type TCard = {
  text: string;
  icon: TwIcon | LucideIcon;
};

type El = React.ElementRef<'a'>;
type Props = React.ComponentPropsWithoutRef<'a'> & TCard;

const Card = React.forwardRef<El, Props>(
  ({ text, icon: Icon, className, href, ...props }, ref) => {
    return (
      <Link
        to={href ?? ''}
        className={cn(
          'rounded-md border border-midnight/20 px-4 py-3',
          'flex items-center shadow',
          'transition-colors duration-100',
          'hover:border-purple-500 focus:border-none',
          className
        )}
        ref={ref}
        {...props}
      >
        <Icon className="size-10 rounded-lg bg-purple-200 p-1 text-purple-500" />
        <span className="ml-4 line-clamp-1 text-sm">{text}</span>
      </Link>
    );
  }
);

Card.displayName = 'QuickActionsCard';

export default Card;
