import { cn } from '@/lib/cn';

interface LandingNavbarProps {
  className?: string;
}

function LandingNavbar({ className }: LandingNavbarProps): React.ReactElement {
  return (
    <>
      <nav
        className={cn(
          'flex justify-between mx-auto w-full max-w-5xl items-center  rounded-full py-2 px-8',
          className
        )}
      >
        <a
          href="/"
          className="text-4xl inline-flex text-black"
        >
          Horizon
        </a>
        <a
          href="/login"
          className="flex rounded-full bg-sky-600 text-white px-4 py-2 font-semibold text-sm"
        >
          Get started
        </a>
      </nav>
      <hr className="h-[2px] w-full bg-black max-w-5xl" />
    </>
  );
}

export default LandingNavbar;
