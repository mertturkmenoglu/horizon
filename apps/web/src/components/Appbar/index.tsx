import { cn } from '@/lib/cn';
import Logo from '../Logo';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface AppbarProps {
  className?: string;
}

function Appbar({ className }: AppbarProps): React.ReactElement {
  return (
    <div
      className={cn(
        'rounded-md border-2 border-sky-500 flex justify-between items-center py-2 px-4',
        className
      )}
    >
      <Logo className="size-8 fill-sky-500" />
      <a href="/me">
        <UserCircleIcon className="size-6 text-sky-500" />
      </a>
    </div>
  );
}

export default Appbar;
