import Menu from './Menu';
import Banner from '../Banner';
import SearchHeader from '../SearchHeader';
import CategoryNavigation from '../CategoryNavigation';
import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';
import Actions from './Actions';

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
          className="flex items-center justify-center py-2"
        >
          {t('welcome')}
        </Banner>
      )}

      <div className="mx-auto mt-4 flex w-full items-start justify-between px-4 2xl:px-0">
        <div className="flex w-full items-start">
          <a
            href="/"
            className="mt-2 rounded-md text-2xl text-midnight"
          >
            <h1>Horizon</h1>
          </a>
          <SearchHeader className="hidden md:mx-8 md:block" />
        </div>

        <div className="mt-1.5 flex items-center space-x-2">
          <Actions />

          <Menu />
        </div>
      </div>

      <SearchHeader className="mt-4 block px-4 md:mx-0 md:hidden" />
      {!isFullWidth && <CategoryNavigation className="-ml-2 px-4 2xl:px-0" />}
    </div>
  );
}

export default Appbar;
