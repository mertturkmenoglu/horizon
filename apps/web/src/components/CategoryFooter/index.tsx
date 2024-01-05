import { categoryData } from '@/lib/categorydata';
import { cn } from '@/lib/cn';
import React from 'react';

type El = React.ElementRef<'nav'>;
type Props = React.ComponentPropsWithoutRef<'nav'>;

const CategoryFooter = React.forwardRef<El, Props>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4',
          className
        )}
        {...props}
      >
        {categoryData.data.map((category) => (
          <div key={category.category}>
            <a
              href={`/categories/${encodeURIComponent(category.category)}`}
              className="font-semibold hover:underline text-base line-clamp-1"
            >
              {category.category}
            </a>
            <ul className="mt-0">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <a
                    href={`/categories/${encodeURIComponent(subcategory.id)}`}
                    className="hover:underline text-base text-neutral-500"
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
