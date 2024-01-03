import { cn } from '@/lib/cn';
import { NavigationMenuLink } from '../NavigationMenu';
import React from 'react';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none',
            'transition-colors hover:bg-sky-500 hover:text-white focus:ring focus:ring-sky-500 group',
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none text-midnight group-hover:text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-neutral-500 group-hover:text-white">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;
