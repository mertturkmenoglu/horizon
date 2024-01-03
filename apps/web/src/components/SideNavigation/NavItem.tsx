import { cn } from '@/lib/cn';
import React from 'react';
import { NavLink } from 'react-router-dom';

export type NavItemProps = React.ComponentPropsWithoutRef<'li'> & {
  href: string;
  text: string;
  icon: TwIcon;
};

const NavItem = React.forwardRef<React.ElementRef<'li'>, NavItemProps>(
  ({ className, href, text, icon: Icon }, ref) => {
    return (
      <li
        ref={ref}
        className={cn('list-none', className)}
      >
        <NavLink
          className={({ isActive }) =>
            cn(
              'flex items-center space-x-2 py-2 rounded-md px-2',
              'focus:outline-none focus:ring focus:ring-sky-500',
              {
                'bg-sky-100 text-sky-600': isActive,
                'hover:bg-neutral-400/20': !isActive,
              }
            )
          }
          to={href}
        >
          <Icon className="size-6 min-h-6 min-w-6" />
          <div>{text}</div>
        </NavLink>
      </li>
    );
  }
);

NavItem.displayName = 'NavItem';

export default NavItem;
