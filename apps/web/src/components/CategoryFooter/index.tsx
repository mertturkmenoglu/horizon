import { cn } from '@/lib/cn';
import React from 'react';
import { data } from './data';

type El = React.ElementRef<'nav'>;
type Props = React.ComponentPropsWithoutRef<'nav'>;

const CategoryFooter = React.forwardRef<El, Props>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-neutral-400/10 p-8',
          className
        )}
        {...props}
      >
        {data.data.map((category) => (
          <div>
            <a
              href=""
              className="font-bold hover:underline text-xl line-clamp-2 h-14"
            >
              {category.category}
            </a>
            <ul className="mt-2">
              {category.subcategories.map((subcategory) => (
                <li>
                  <a
                    href=""
                    className="hover:underline"
                  >
                    {subcategory.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    );
  }
);

CategoryFooter.displayName = 'CategoryFooter';

export default CategoryFooter;
