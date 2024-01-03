import React from 'react';
import Logo from '../Logo';
import { cn } from '@/lib/cn';
import {
  BellIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import NavItem, { TNavItem } from './NavItem';
import UserCard from './UserCard';

export type SideNavigationProps = React.ComponentPropsWithoutRef<'nav'> & {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const navItems: TNavItem[] = [
  { href: '/home', text: 'Home', icon: HomeIcon },
  { href: '/my-services', text: 'My Services', icon: SquaresPlusIcon },
  { href: '/explore', text: 'Explore', icon: MagnifyingGlassIcon },
  { href: '/schedule', text: 'My Schedule', icon: CalendarDaysIcon },
  { href: '/overview', text: 'Overview', icon: ChartBarIcon },
  { href: '/notifications', text: 'Notifications', icon: BellIcon },
  { href: '/messages', text: 'Messages', icon: PaperAirplaneIcon },
];

const SideNavigation = React.forwardRef<
  React.ElementRef<'nav'>,
  SideNavigationProps
>(({ className, collapsed, setCollapsed }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn(
        'border-r border-midnight/20 h-screen p-4 w-full flex flex-col',
        className
      )}
    >
      <div
        className={cn('flex justify-between items-center', {
          'flex-col space-y-4': collapsed,
        })}
      >
        <a
          href="/"
          className="flex space-x-2 items-center focus:outline-none focus:ring focus:ring-sky-500 rounded"
        >
          <Logo className="size-8" />
          {!collapsed && (
            <div className="font-light text-midnight">Horizon</div>
          )}
        </a>

        <button
          className="p-2 rounded-lg bg-neutral-400/20 focus:outline-none focus:ring focus:ring-sky-500"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed && (
            <ChevronDoubleRightIcon className="size-4 text-midnight" />
          )}
          {!collapsed && (
            <ChevronDoubleLeftIcon className="size-4 text-midnight" />
          )}
        </button>
      </div>

      <div className="flex flex-col justify-between h-[98%]">
        <div className="mt-8 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </div>

        <UserCard collapsed={collapsed} />
      </div>
    </nav>
  );
});

SideNavigation.displayName = 'SideNavigation';

export default SideNavigation;
