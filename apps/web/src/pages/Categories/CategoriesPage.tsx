import Breadcrumb from '@/components/Breadcrumb';
import ServiceCategory from '@/components/ServiceCategory';
import { useCategoryData } from '@/hooks/useCategoryData';
import MainLayout from '@/layouts/MainLayout';
import { useTranslation } from 'react-i18next';

function CategoriesPage(): React.ReactElement {
  const { t } = useTranslation('categories', { keyPrefix: 'explore' });
  const categories = useCategoryData();

  return (
    <MainLayout>
      <Breadcrumb
        items={[{ href: '/categories', text: t('categories') }]}
        className="mt-8"
      />
      <h2 className="my-8 text-3xl">{t('title')}</h2>
      {categories.data.map((c) => (
        <ServiceCategory
          key={`category-${c.id}`}
          category={c}
          className="mt-8"
        />
      ))}
    </MainLayout>
  );
}

export default CategoriesPage;