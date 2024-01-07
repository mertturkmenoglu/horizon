import Menu from './Menu';
import Banner from '../Banner';
import SearchHeader from '../SearchHeader';
import { BellIcon } from 'lucide-react';
import CategoryNavigation from '../CategoryNavigation';
import { cn } from '@/lib/cn';
import { EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface AppbarProps {
  className?: string;
  isFullWidth?: boolean;
}

function Appbar({ className, isFullWidth }: AppbarProps): React.ReactElement {
  const { t } = useTranslation('appbar');
  return (
    <div className={cn('w-full', className)}>
      {!isFullWidth && (
        <Banner
          appearance="announcement"
          className="flex justify-center items-center py-2"
        >
          {t('welcome')}
        </Banner>
      )}

      <div className="flex items-start mt-4 w-full justify-between mx-auto px-4 2xl:px-0">
        <div className="flex items-start w-full">
          <a
            href="/"
            className="mt-2 text-midnight text-2xl rounded-md"
          >
            Horizon
          </a>
          <SearchHeader className="hidden md:block md:mx-8" />
        </div>

        <div className="flex items-center mt-1.5 space-x-2">
          <a
            href="/services/new"
            className="rounded-full hover:bg-neutral-400/20"
          >
            <PlusIcon className="size-10 p-2" />
            <span className="sr-only">{t('create-service')}</span>
          </a>
          <a
            href="/notifications"
            className="rounded-full hover:bg-neutral-400/20"
          >
            <BellIcon className="size-10 p-2" />
            <span className="sr-only">{t('notifications')}</span>
          </a>
          <a
            href="/messages"
            className="rounded-full hover:bg-neutral-400/20"
          >
            <EnvelopeIcon className="size-10 p-2" />
            <span className="sr-only">{t('messages')}</span>
          </a>

          <Menu />
        </div>
      </div>

      <SearchHeader className="block md:hidden mt-4 px-4 md:mx-0" />
      {!isFullWidth && <CategoryNavigation className="-ml-2 px-4 2xl:px-0" />}
    </div>
  );
}

export default Appbar;
