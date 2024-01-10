import { useCategoryData } from '@/hooks/useCategoryData';
import { cn } from '@/lib/cn';
import React from 'react';
import { useTranslation } from 'react-i18next';

type El = React.ElementRef<'nav'>;
type Props = React.ComponentPropsWithoutRef<'nav'>;

const CategoryFooter = React.forwardRef<El, Props>(
  ({ className, ...props }, ref) => {
    const { t } = useTranslation('common');
    const categoryData = useCategoryData();

    return (
      <nav
        ref={ref}
        aria-label={t('footer.category-description')}
        className={cn(
          'grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
          className
        )}
        {...props}
      >
        {categoryData.data.map((category) => (
          <div key={category.category}>
            <a
              href={`/categories/${encodeURIComponent(category.category)}`}
              className="line-clamp-1 text-base font-semibold hover:underline"
            >
              {category.category}
            </a>
            <ul className="mt-0">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <a
                    href={`/categories/${encodeURIComponent(subcategory.id)}`}
                    className="text-base text-neutral-500 hover:underline"
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
