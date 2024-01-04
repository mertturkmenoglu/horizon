import CategoryNavigation from '@/components/CategoryNavigation';
import SearchHeader from '@/components/SearchHeader';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';

function HomePage(): React.ReactElement {
  const { user } = useAuth();

  return (
    <MainLayout>
      <SearchHeader />
      <CategoryNavigation />

      <div>
        <h2 className="mt-8 text-4xl font-bold">Hey {user?.name}</h2>
        <div className="mt-2 text-lg font-bold">How can we help you?</div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
