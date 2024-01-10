import { useAuth } from '@/hooks/useAuth';
import LandingHero from '../components/LandingHero';
import LandingNavbar from '../components/LandingNavbar';
import LandingBanner from '@/components/LandingBanner';
import Spinner from '@/components/Spinner';

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
