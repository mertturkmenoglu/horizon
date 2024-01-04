import { cn } from '@/lib/cn';
import React from 'react';
import Card, { TCard } from './Card';
import {
  AcademicCapIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

type El = React.ElementRef<'div'>;
type Props = React.ComponentPropsWithoutRef<'div'>;

const cards: (TCard & { href: string })[] = [
  { text: 'Go to my overview', icon: ChartBarIcon, href: '/overview' },
  { text: 'Review my schedule', icon: CalendarDaysIcon, href: '/schedule' },
  { text: 'View payments', icon: BanknotesIcon, href: '/payments' },
  { text: 'Read the docs', icon: AcademicCapIcon, href: '/docs' },
];

const QuickActions = React.forwardRef<El, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full',
          className
        )}
        {...props}
      >
        {cards.map((card) => (
          <Card
            key={card.href}
            icon={card.icon}
            text={card.text}
            href={card.href}
          />
        ))}
      </div>
    );
  }
);

QuickActions.displayName = 'QuickActions';

export default QuickActions;
