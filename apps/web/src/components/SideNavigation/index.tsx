import React from 'react';
import Logo from '../Logo';
import { cn } from '@/lib/cn';
import {
  CalendarDaysIcon,
  ChartBarIcon,
  ChevronDoubleLeftIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import NavItem from './NavItem';
import UserCard from './UserCard';

export type SideNavigationProps = React.ComponentPropsWithoutRef<'nav'>;

const SideNavigation = React.forwardRef<
  React.ElementRef<'nav'>,
  SideNavigationProps
>(({ className }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn('border-r border-midnight/20 h-screen p-4', className)}
    >
      <div className="flex justify-between items-center">
        <a
          href="/"
          className="flex space-x-2 items-center focus:outline-none focus:ring focus:ring-sky-500 rounded"
        >
          <Logo className="size-8" />
          <div className="font-light text-midnight">Horizon</div>
        </a>

        <button className="p-2 rounded-lg bg-neutral-400/20 focus:outline-none focus:ring focus:ring-sky-500">
          <ChevronDoubleLeftIcon className="size-4 text-midnight" />
        </button>
      </div>

      <div className="flex flex-col justify-between h-[98%]">
        <div className="mt-8 space-y-2">
          <NavItem
            href="/home"
            text="Home"
            icon={HomeIcon}
          />

          <NavItem
            href="/explore"
            text="Explore"
            icon={MagnifyingGlassIcon}
          />

          <NavItem
            href="/schedule"
            text="My Schedule"
            icon={CalendarDaysIcon}
          />

          <NavItem
            href="/overview"
            text="Overview"
            icon={ChartBarIcon}
          />
        </div>

        <UserCard />
      </div>
    </nav>
  );
});

SideNavigation.displayName = 'SideNavigation';

export default SideNavigation;
