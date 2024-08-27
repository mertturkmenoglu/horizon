import { cn } from '@/lib/utils';
import {
  CalendarDays,
  ChartColumnIncreasing,
  GraduationCap,
  HandCoins,
} from 'lucide-react';
import QuickActionCard from './card';

const cards = [
  { icon: ChartColumnIncreasing, href: '/overview', text: 'Go to my overview' },
  { icon: CalendarDays, href: '/schedule', text: 'Review my schedule' },
  { icon: HandCoins, href: '/payments', text: 'View payments' },
  { icon: GraduationCap, href: '/docs', text: 'Read the docs' },
];

type Props = {
  className?: string;
};

export default function QuickActions({ className }: Readonly<Props>) {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4',
        className
      )}
    >
      {cards.map((card) => (
        <QuickActionCard
          key={card.href}
          icon={card.icon}
          text={card.text}
          href={card.href}
        />
      ))}
    </div>
  );
}
