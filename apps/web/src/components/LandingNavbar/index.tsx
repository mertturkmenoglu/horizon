import { cn } from '@/lib/cn';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface LandingNavbarProps {
  className?: string;
}

function LandingNavbar({ className }: LandingNavbarProps): React.ReactElement {
  return (
    <nav
      className={cn(
        'flex justify-between mx-auto w-full max-w-7xl items-center py-1 border-b border-b-midnight',
        className
      )}
    >
      <a
        href="/"
        className="text-4xl inline-flex text-midnight"
      >
        Horizon
      </a>
      <a
        href="/login"
        className="flex rounded-md bg-midnight text-white px-4 py-2 font-semibold text-sm items-center space-x-2"
      >
        <span>Get started</span>
        <ArrowRightIcon className="size-4 animate-pulse" />
      </a>
    </nav>
  );
}

export default LandingNavbar;
