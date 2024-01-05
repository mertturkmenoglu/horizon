import Menu from './Menu';
import Banner from '../Banner';
import SearchHeader from '../SearchHeader';
import { BellIcon } from 'lucide-react';
import CategoryNavigation from '../CategoryNavigation';
import { cn } from '@/lib/cn';
import { EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';

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

      <div className="flex items-start mt-4 w-full justify-between mx-auto px-4 md:px-0">
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
          </a>
          <a
            href="/notifications"
            className="rounded-full hover:bg-neutral-400/20"
          >
            <BellIcon className="size-10 p-2" />
          </a>
          <a
            href="/messages"
            className="rounded-full hover:bg-neutral-400/20"
          >
            <EnvelopeIcon className="size-10 p-2" />
          </a>

          <Menu />
        </div>
      </div>

      <SearchHeader className="block md:hidden mt-4 px-4 md:mx-0" />
      <CategoryNavigation className="-ml-2 px-4 sm:px-0" />
    </div>
  );
}

export default Appbar;
