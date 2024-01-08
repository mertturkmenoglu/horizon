import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Banner from '../Banner';
import { useTranslation } from 'react-i18next';

function LandingBanner(): React.ReactElement {
  const { t } = useTranslation('landing', { keyPrefix: 'banner' });
  return (
    <Banner
      appearance="announcement"
      className="flex justify-center items-baseline"
    >
      <div className="bg-sky-600 rounded-full text-white text-sm font-bold px-3 py-0.5">
        {t('new')}
      </div>
      <div className="py-1 text-base font-medium text-midnight ml-4">
        {t('text')}
      </div>
      <div className="ml-4">
        <a
          href="/register"
          className="font-bold text-midnight flex items-center text-base"
        >
          {t('cta')}
          <ArrowRightIcon className="size-4 ml-1" />
        </a>
      </div>
    </Banner>
  );
}

export default LandingBanner;
