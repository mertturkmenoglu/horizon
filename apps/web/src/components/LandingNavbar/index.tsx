import { cn } from '@/lib/cn';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';

import React from 'react';
import Menu from './Menu';

interface LandingNavbarProps {
  className?: string;
}

function LandingNavbar({ className }: LandingNavbarProps): React.ReactElement {
  return (
    <nav
      className={cn(
        'flex justify-between mx-auto w-full items-center py-1 px-4',
        className
      )}
    >
      <div className="flex items-center space-x-8">
        <a
          href="/"
          className="text-2xl inline-flex text-midnight items-center"
        >
          <Logo className="size-12" />
          <div className="ml-4 font-medium">Horizon</div>
        </a>

        <Menu />
      </div>

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
