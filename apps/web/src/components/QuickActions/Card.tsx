import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

export type TCard = {
  text: string;
  icon: TwIcon | LucideIcon;
};

type El = React.ElementRef<'a'>;
type Props = React.ComponentPropsWithoutRef<'a'> & TCard;

const Card = React.forwardRef<El, Props>(
  ({ text, icon: Icon, className, href, ...props }, ref) => {
    return (
      <a
        href={href}
        className={cn(
          'border border-midnight/20 rounded-md px-4 py-3',
          'flex items-center shadow',
          'transition-colors duration-100',
          'hover:border-purple-500',
          'focus:outline-none focus:ring focus:ring-sky-500 focus:border-none',
          className
        )}
        ref={ref}
        {...props}
      >
        <Icon className="size-10 text-purple-500 bg-purple-200 rounded-lg p-1" />
        <span className="text-sm line-clamp-1 ml-4">{text}</span>
      </a>
    );
  }
);

Card.displayName = 'QuickActionsCard';

export default Card;
