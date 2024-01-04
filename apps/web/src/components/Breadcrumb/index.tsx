import { cn } from '@/lib/cn';
import { HomeIcon } from '@heroicons/react/24/outline';
import { Slash } from 'lucide-react';
import React from 'react';

export type TBreadcrumbItem = {
  text: string;
  href: string;
};

type El = React.ElementRef<'nav'>;
type Props = React.ComponentPropsWithoutRef<'nav'> & {
  items: TBreadcrumbItem[];
};

const Breadcrumb = React.forwardRef<El, Props>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        <ul className="list-none flex items-end space-x-2">
          <li>
            <a href="/home">
              <HomeIcon className="size-6 text-midnight" />
            </a>
          </li>

          {items.map((item) => (
            <li
              key={item.href}
              className="flex items-center space-x-2"
            >
              <Slash className="size-4 -rotate-12" />
              <a
                href={item.href}
                className="hover:underline"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
