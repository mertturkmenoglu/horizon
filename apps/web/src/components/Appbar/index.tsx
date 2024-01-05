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

      <div className="flex items-start mt-4 w-full justify-between mx-auto">
        <div className="flex items-start w-full">
          <a
            href="/"
            className="hidden sm:flex mt-2 text-midnight text-2xl"
          >
            Horizon
          </a>
          <SearchHeader className="w-full mx-2 sm:mx-8" />
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
      <CategoryNavigation className="-ml-2" />
    </div>
  );
}

export default Appbar;
