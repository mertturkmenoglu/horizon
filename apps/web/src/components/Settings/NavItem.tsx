import { cn } from '@/lib/cn';
import { useSearchParams } from 'react-router-dom';

export type TNavItem = {
  id: string;
  name: string;
  component: React.ReactElement;
  icon: TwIcon;
};

export function NavItem({
  id,
  name,
  icon: Icon,
}: TNavItem): React.ReactElement {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'account';
  const isCurrentTab = tab === id;
  return (
    <li className="w-full">
      <a
        href={`/settings?tab=${id}`}
        className={cn(
          'flex space-x-2 items-center text- py-1 px-4 rounded-md mx-2',
          'transition-all ease-out duration-100',
          'hover:bg-sky-600/90 hover:text-white focus:bg-sky-600/90 focus:text-white',
          'font-semibold text-sm',
          'focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 focus:outline-none',
          {
            'bg-sky-600 text-white': isCurrentTab,
          }
        )}
      >
        <Icon
          className={cn('size-5', {
            'text-white': isCurrentTab,
          })}
        />
        <span>{name}</span>
      </a>
    </li>
  );
}
