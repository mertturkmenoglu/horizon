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
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import NavItem, { TNavItem } from './NavItem';
import UserCard from './UserCard';
import { Send } from 'lucide-react';

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
  { href: '/messages', text: 'Messages', icon: Send },
];

const SideNavigation = React.forwardRef<
  React.ElementRef<'nav'>,
  SideNavigationProps
>(({ className, collapsed, setCollapsed }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn(
        'flex h-screen w-full flex-col border-r border-midnight/20 p-4',
        className
      )}
    >
      <div
        className={cn('mt-2 flex items-center justify-between', {
          'flex-col space-y-4': collapsed,
        })}
      >
        <a
          href="/"
          className="flex items-center space-x-2 rounded focus:outline-none focus:ring focus:ring-sky-500"
        >
          <Logo className="size-8" />
          {!collapsed && (
            <div className="font-light text-midnight">Horizon</div>
          )}
        </a>

        <button
          className="rounded-lg bg-neutral-400/20 p-2 focus:outline-none focus:ring focus:ring-sky-500"
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

      <div className="flex h-[98%] flex-col justify-between">
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
