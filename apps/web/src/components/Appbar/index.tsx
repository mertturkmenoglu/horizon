import { cn } from '@/lib/cn';
import { BellIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Menu from './Menu';

interface AppbarProps {
  className?: string;
}

function Appbar({ className }: AppbarProps): React.ReactElement {
  return (
    <div
      className={cn(
        ' border-b-2 border-midnight flex justify-between items-center pb-1',
        className
      )}
    >
      <a
        href="/"
        className="text-2xl inline-flex text-midnight"
      >
        Horizon
      </a>

      <div className="flex items-center space-x-4">
        <a href="/notifications">
          <BellIcon className="size-6 text-midnight" />
          <span className="sr-only">Notifications</span>
        </a>

        <a href="/messages">
          <EnvelopeIcon className="size-6 text-midnight" />
          <span className="sr-only">Messages</span>
        </a>

        <Menu />
      </div>
    </div>
  );
}

export default Appbar;
