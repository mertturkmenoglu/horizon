import { useAuth } from '@/hooks/useAuth';
import LandingHero from '../components/LandingHero';
import LandingNavbar from '../components/LandingNavbar';
import LandingBanner from '@/components/LandingBanner';

function LandingPage(): React.ReactElement {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="bg-white w-full h-screen flex flex-col items-center">
      <LandingBanner />
      <LandingNavbar className="mt-2" />
      <LandingHero className="mt-64" />
    </div>
  );
}

export default LandingPage;
