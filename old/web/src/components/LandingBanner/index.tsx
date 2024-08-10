import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Banner from '../Banner';

function LandingBanner(): React.ReactElement {
  const { t } = useTranslation('landing', { keyPrefix: 'banner' });
  return (
    <Banner
      appearance="announcement"
      className="flex items-baseline justify-center"
    >
      <div className="rounded-full bg-sky-700 px-3 py-0.5 text-sm font-bold text-white">
        {t('new')}
      </div>
      <div className="ml-4 py-1 text-base font-medium text-midnight">
        {t('text')}
      </div>
      <div className="ml-4">
        <Link
          to="/register"
          className="flex items-center text-base font-bold text-midnight"
        >
          {t('cta')}
          <ArrowRightIcon className="ml-1 size-4" />
        </Link>
      </div>
    </Banner>
  );
}

export default LandingBanner;
