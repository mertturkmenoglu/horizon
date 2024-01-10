import { useCategoryData } from '@/hooks/useCategoryData';
import { cn } from '@/lib/cn';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from './Card';

type Props = React.ComponentPropsWithoutRef<'div'>;

function BrowseCategoriesGrid({
  className,
  ...props
}: Props): React.ReactElement {
  const { t } = useTranslation('common', { keyPrefix: 'browse-categories' });
  const categories = useCategoryData();

  return (
    <div
      className={cn('', className)}
      {...props}
    >
      <div className="text-2xl font-bold">{t('title')}</div>

      <div className="flex space-x-2 text-sm font-medium">
        <div>{t('looking-all')}</div>
        <a
          href="/services/categories"
          className="text-yellow-500 hover:underline"
        >
          {t('browse-all')}
        </a>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {categories.data.map((category) => (
          <Card
            key={category.category}
            category={category.category}
          />
        ))}
      </div>
    </div>
  );
}

export default BrowseCategoriesGrid;
