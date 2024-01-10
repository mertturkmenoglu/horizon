import BrowseCategoriesGrid from '@/components/BrowseCategoriesGrid';
import FeaturesCarousel from '@/components/FeaturesCarousel';
import QuickActions from '@/components/QuickActions';
import RecommendationGrid from '@/components/RecommendationGrid';
import ReferToFriend from '@/components/ReferToFriend';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';
import { newServices, populerRightNow } from '@/lib/dummydata';
import { useTranslation } from 'react-i18next';

function HomePage(): React.ReactElement {
  const { t } = useTranslation('home');
  const { user } = useAuth();

  return (
    <MainLayout>
      <ReferToFriend className="mt-0" />
      <h2 className="mt-8 text-4xl font-bold">
        {t('title', { name: user?.name ?? '' })}
      </h2>
      <div className="mt-2 text-lg font-bold">{t('subtitle')}</div>

      <QuickActions className="mt-8" />

      <BrowseCategoriesGrid className="mt-16" />

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

      <FeaturesCarousel className="mx-auto mt-16 max-w-[80%] md:max-w-[70%]" />

      <div className="my-32"></div>
    </MainLayout>
  );
}

export default HomePage;
