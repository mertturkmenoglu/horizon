import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

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
  const { t } = useTranslation('settings');
  const params = useParams();
  const tab = params.tab ?? 'account';
  const isCurrentTab = tab === id;
  const to = id === 'help' ? '/help' : `/settings/${id}`;

  return (
    <li className="w-full">
      <Link
        to={to}
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
        <span>{t(name)}</span>
      </Link>
    </li>
  );
}
