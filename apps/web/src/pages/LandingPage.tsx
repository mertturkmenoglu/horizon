import LandingHero from '../components/LandingHero';
import LandingNavbar from '../components/LandingNavbar';

function LandingPage(): React.ReactElement {
  return (
    <div className="bg-[#1a1a1a] w-full h-screen flex flex-col items-center">
      <LandingNavbar className="mt-8" />
      <LandingHero className="mt-64" />
    </div>
  );
}

export default LandingPage;
