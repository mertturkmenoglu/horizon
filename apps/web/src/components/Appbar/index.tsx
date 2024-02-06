import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../Banner';
import CategoryNavigation from '../CategoryNavigation';
import SearchHeader from '../SearchHeader';
import Actions from './Actions';
import Menu from './Menu';
import { useAuth } from '@/hooks/useAuth';
import Button from '../Button';

interface AppbarProps {
  className?: string;
  isFullWidth?: boolean;
}

function Appbar({ className, isFullWidth }: AppbarProps): React.ReactElement {
  const { isAuthenticated, isLoading } = useAuth();
  const { t } = useTranslation('appbar');
  const navigate = useNavigate();

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
          <Link
            to="/"
            className="mt-2 rounded-md text-2xl text-midnight"
          >
            <h1>Horizon</h1>
          </Link>
          <SearchHeader className="hidden md:mx-8 md:block" />
        </div>

        <div className={cn('mt-1 flex items-center space-x-2')}>
          {isLoading && (
            <div className="size-8 h-10 w-48 animate-pulse rounded-md bg-neutral-400/20" />
          )}
          {!isLoading && isAuthenticated && (
            <>
              <Actions />
              <Menu />
            </>
          )}
          {!isLoading && !isAuthenticated && (
            <Button
              appearance="midnight"
              className="min-w-32"
              onClick={() => {
                navigate('/login');
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      <SearchHeader className="mt-4 block px-4 md:mx-0 md:hidden" />
      {!isFullWidth && <CategoryNavigation className="-ml-2 px-4 2xl:px-0" />}
    </div>
  );
}

export default Appbar;
