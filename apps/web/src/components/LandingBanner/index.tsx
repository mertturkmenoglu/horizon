import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Banner from '../Banner';

function LandingBanner(): React.ReactElement {
  return (
    <Banner
      appearance="announcement"
      className="flex justify-center items-baseline"
    >
      <div className="bg-sky-600 rounded-full text-white text-sm font-bold px-3 py-0.5">
        New
      </div>
      <div className="py-1 text-base font-medium text-midnight ml-4">
        Introducing Horizon - your new address to find services.
      </div>
      <div className="ml-4">
        <a
          href="/register"
          className="font-bold text-midnight flex items-center text-base"
        >
          Sign up now
          <ArrowRightIcon className="size-4 ml-1" />
        </a>
      </div>
    </Banner>
  );
}

export default LandingBanner;
