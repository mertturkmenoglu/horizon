import { useAuth } from '@/hooks/useAuth';
import LandingHero from '../components/LandingHero';
import LandingNavbar from '../components/LandingNavbar';

function LandingPage(): React.ReactElement {
  const { loading } = useAuth();

  if (loading) {
    return <></>;
  }

  return (
    <div className="bg-white w-full h-screen flex flex-col items-center">
      <LandingNavbar className="mt-8" />
      <LandingHero className="mt-64" />
    </div>
  );
}

export default LandingPage;
