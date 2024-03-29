import { cn } from '@/lib/cn';
import {
  AcademicCapIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Card, { TCard } from './Card';

type El = React.ElementRef<'div'>;
type Props = React.ComponentPropsWithoutRef<'div'>;

const cards: (Omit<TCard, 'text'> & { href: string })[] = [
  { icon: ChartBarIcon, href: '/overview' },
  { icon: CalendarDaysIcon, href: '/schedule' },
  { icon: BanknotesIcon, href: '/payments' },
  { icon: AcademicCapIcon, href: '/docs' },
];

const QuickActions = React.forwardRef<El, Props>(
  ({ className, ...props }, ref) => {
    const { t } = useTranslation('common', { keyPrefix: 'quick-actions' });
    return (
      <div
        ref={ref}
        className={cn(
          'grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4',
          className
        )}
        {...props}
      >
        {cards.map((card, i) => (
          <Card
            key={card.href}
            icon={card.icon}
            text={t(`cards.${i}.text`)}
            href={card.href}
          />
        ))}
      </div>
    );
  }
);

QuickActions.displayName = 'QuickActions';

export default QuickActions;
