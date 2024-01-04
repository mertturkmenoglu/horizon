import Menu from './Menu';
import Banner from '../Banner';
import SearchHeader from '../SearchHeader';
import { SendIcon, BellIcon } from 'lucide-react';
import CategoryNavigation from '../CategoryNavigation';
import { cn } from '@/lib/cn';

interface AppbarProps {
  className?: string;
}

function Appbar({ className }: AppbarProps): React.ReactElement {
  return (
    <div className={cn('w-full', className)}>
      <Banner
        appearance="announcement"
        className="flex justify-center items-center py-2"
      >
        Welcome to Horizon
      </Banner>

      <div className="flex items-start mt-4 w-full justify-between mx-auto">
        <div className="flex items-start w-full">
          <a
            href="/"
            className="mt-2 text-midnight text-2xl"
          >
            Horizon
          </a>
          <SearchHeader className="w-full mx-8" />
        </div>

        <div className="flex items-center mt-1.5 space-x-4">
          <a href="/notifications">
            <BellIcon className="size-6" />
          </a>
          <a href="/messages">
            <SendIcon className="size-6" />
          </a>

          <Menu />
        </div>
      </div>
      <CategoryNavigation className="-ml-2" />
    </div>
  );
}

export default Appbar;
