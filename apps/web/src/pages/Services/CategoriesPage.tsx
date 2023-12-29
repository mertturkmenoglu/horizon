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
      <h2 className="my-16 text-3xl">Explore All Services</h2>
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
