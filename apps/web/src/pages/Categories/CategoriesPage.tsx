import Breadcrumb from '@/components/Breadcrumb';
import GenericError from '@/components/GenericError';
import ServiceCategory from '@/components/ServiceCategory';
import Spinner from '@/components/Spinner';
import { useCategoryData } from '@/hooks/useCategoryData';
import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { CategoryServiceCountDto } from '@/lib/dto/service';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

function CategoriesPage(): React.ReactElement {
  const { t } = useTranslation('categories', { keyPrefix: 'explore' });
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
    <MainLayout>
      <Breadcrumb
        items={[{ href: '/categories', text: t('categories') }]}
        className="mt-8"
      />
      <h2 className="my-8 text-3xl">{t('title')}</h2>
      {query.isLoading && <Spinner className="mt-4" />}
      {query.isError && <GenericError />}
      {query.data &&
        categories.data.map((c) => (
          <ServiceCategory
            key={`category-${c.id}`}
            category={c}
            className="mt-8"
            counts={query.data}
          />
        ))}
    </MainLayout>
  );
}

export default CategoriesPage;
