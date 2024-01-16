import { useCategoryData } from '@/hooks/useCategoryData';
import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { CategoryServiceCountDto } from '@/lib/dto/service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CategoryCard from '../CategoryCard';
import GenericError from '../GenericError';
import Spinner from '../Spinner';

type Props = React.ComponentPropsWithoutRef<'div'>;

function BrowseCategoriesGrid({
  className,
  ...props
}: Props): React.ReactElement {
  const { t } = useTranslation('common', { keyPrefix: 'browse-categories' });
  const categories = useCategoryData();
  const query = useQuery({
    queryKey: ['category-service-count'],
    queryFn: async () => {
      const res = await api<{ data: CategoryServiceCountDto[] }>(
        '/services/categories-count'
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div
      className={cn('', className)}
      {...props}
    >
      <div className="text-2xl font-bold">{t('title')}</div>

      <div className="flex space-x-2 text-sm font-medium">
        <div>{t('looking-all')}</div>
        <Link
          to="/categories"
          className="text-sky-600 hover:underline"
        >
          {t('browse-all')}
        </Link>
      </div>

      {query.isLoading && <Spinner className="" />}
      {query.isError && <GenericError />}
      {query.data && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {categories.data.map((category) => (
            <CategoryCard
              id={category.id}
              key={category.title}
              category={category.title}
              img={category.image}
              count={
                query.data.find((r) => r.category === category.id)?.count ?? 0
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseCategoriesGrid;
