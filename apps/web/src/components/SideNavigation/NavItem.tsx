import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export type TNavItem = {
  href: string;
  text: string;
  icon: TwIcon | LucideIcon;
  collapsed?: boolean;
};

export type NavItemProps = React.ComponentPropsWithoutRef<'li'> & TNavItem;

const NavItem = React.forwardRef<React.ElementRef<'li'>, NavItemProps>(
  ({ className, href, text, icon: Icon, collapsed = false }, ref) => {
    return (
      <li
        ref={ref}
        className={cn('list-none', className)}
      >
        <NavLink
          className={({ isActive }) =>
            cn(
              'flex items-center py-2 rounded-md px-2',
              'focus:outline-none focus:ring focus:ring-sky-500',
              {
                'bg-midnight text-white': isActive,
                'hover:bg-neutral-400/20': !isActive,
                'space-x-2': !collapsed,
                'justify-center': collapsed,
              }
            )
          }
          to={href}
        >
          <Icon className="size-6 min-h-6 min-w-6" />
          {!collapsed && <div>{text}</div>}
        </NavLink>
      </li>
    );
  }
);

NavItem.displayName = 'NavItem';

export default NavItem;
