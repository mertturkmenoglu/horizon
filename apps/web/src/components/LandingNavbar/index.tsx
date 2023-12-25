import { cn } from '@/lib/cn';

interface LandingNavbarProps {
  className?: string;
}

function LandingNavbar({ className }: LandingNavbarProps): React.ReactElement {
  return (
    <nav
      className={cn(
        'flex justify-between mx-auto w-full max-w-5xl text-white items-center  rounded-full py-2 px-8',
        className
      )}
    >
      <a
        href="/"
        className="text-4xl inline-flex font-bold"
      >
        Horizon
      </a>
      <a
        href="/signin"
        className="flex rounded-full bg-sky-600 px-4 py-2 font-semibold text-sm"
      >
        Get started
      </a>
    </nav>
  );
}

export default LandingNavbar;
