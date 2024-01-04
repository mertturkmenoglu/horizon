import Breadcrumb from '@/components/Breadcrumb';
import ServiceCategory from '@/components/ServiceCategory';
import { useServiceCategories } from '@/hooks/useServiceCategories';
import MainLayout from '@/layouts/MainLayout';

function CategoriesPage(): React.ReactElement {
  const { isLoading, categories } = useServiceCategories();

  if (isLoading || categories === null) {
    return <></>;
  }

  return (
    <MainLayout>
      <Breadcrumb
        items={[{ href: '/categories', text: 'Categories' }]}
        className="mt-8"
      />
      <h2 className="my-8 text-3xl">Explore All Services</h2>
      {categories.map((c) => (
        <ServiceCategory
          cat={c}
          className="mt-8"
        />
      ))}
    </MainLayout>
  );
}

export default CategoriesPage;
