import FeaturesCarousel from '@/components/FeaturesCarousel';
import QuickActions from '@/components/QuickActions';
import RecommendationGrid from '@/components/RecommendationGrid';
import ReferToFriend from '@/components/ReferToFriend';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';
import { newServices, populerRightNow } from '@/lib/dummydata';

function HomePage(): React.ReactElement {
  const { user } = useAuth();
  return (
    <MainLayout>
      <ReferToFriend className="mt-0" />
      <h2 className="mt-8 text-4xl font-bold">Hey {user?.name},</h2>
      <div className="mt-2 text-lg font-bold">How can we help you?</div>

      <QuickActions className="mt-8" />

      <RecommendationGrid
        className="mt-16"
        title={{
          text: 'Popular Right Now',
          href: '/',
        }}
        items={populerRightNow}
      />

      <RecommendationGrid
        className="mt-8"
        title={{
          text: 'New Services',
          href: '/',
        }}
        items={newServices}
      />

      <FeaturesCarousel className="mt-16 max-w-[80%] md:max-w-[70%] mx-auto" />

      <div className="my-32"></div>
    </MainLayout>
  );
}

export default HomePage;
