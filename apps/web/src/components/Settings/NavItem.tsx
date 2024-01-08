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
          'mx-2 flex items-center space-x-2 rounded-md px-4 py-2',
          'transition-all duration-100 ease-out',
          'font-semibold',
          {
            'bg-midnight text-white hover:bg-opacity-80': isCurrentTab,
            'hover:bg-neutral-400/20': !isCurrentTab,
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
