import CategoryNavigation from '@/components/CategoryNavigation';
import SearchHeader from '@/components/SearchHeader';
import MainLayout from '@/layouts/MainLayout';

function HomePage(): React.ReactElement {
  return (
    <MainLayout>
      <SearchHeader />
      <CategoryNavigation />
    </MainLayout>
  );
}

export default HomePage;
