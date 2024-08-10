import LandingBanner from '@/components/LandingBanner';
import LandingHero from '@/components/LandingHero';
import LandingNavbar from '@/components/LandingNavbar';
import Spinner from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';

function LandingPage(): React.ReactElement {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  return (
    <main className="flex h-screen w-full flex-col items-center bg-white">
      <LandingBanner />
      <LandingNavbar className="mt-2" />
      <LandingHero className="mt-64" />
    </main>
  );
}

export default LandingPage;
