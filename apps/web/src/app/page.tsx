import CategoryNavigation from '@/components/blocks/category-navigation';
import FeaturesCarousel from '@/components/blocks/features-carousel';
import QuickActions from '@/components/blocks/quick-actions';
import ReferToFriend from '@/components/blocks/refer-to-friend';
import { getAuth } from '@/lib/auth';

export default async function Page() {
  const auth = await getAuth();
  const isSignedIn = auth !== null;

  return (
    <main className="container">
      <div className="py-4"></div>
      <CategoryNavigation />
      {isSignedIn && (
        <>
          <ReferToFriend className="mx-auto mt-0" />
          <h2 className="mt-8 text-4xl font-bold">Hey {auth.data.fullName}</h2>
          <div className="mt-2 text-lg font-semibold">How can we help you?</div>

          <QuickActions className="mt-8" />
        </>
      )}

      {/* BrowseCategoriesGrid */}
      {/* Recommendation Grid - Popular */}
      {/* Recommendation Grid - New */}

      <FeaturesCarousel className="mx-auto mt-16 max-w-[80%] md:max-w-[70%]" />
    </main>
  );
}
