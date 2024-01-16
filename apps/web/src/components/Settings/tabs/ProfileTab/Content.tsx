import { GetMeResponse } from '@/lib/dto';
import { useTranslation } from 'react-i18next';
import ContactInformationForm from './ContactInformationForm';
import ProfileForm from './ProfileForm';
import ProfileImageForm from './ProfileImageForm';

type Props = {
  user: GetMeResponse;
};

function Content({ user }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <hr className="h-[2px] w-full bg-black" />

      <ProfileImageForm className="mt-4 max-w-lg" />

      <h2 className="mt-8 text-2xl font-semibold">{t('about-you')}</h2>
      <hr className="h-[2px] w-full bg-black" />

      <ProfileForm
        className="mt-4"
        user={user}
      />

      <h2 className="mt-8 text-2xl font-semibold">
        {t('contact-information')}
      </h2>
      <hr className="h-[2px] w-full bg-black" />
      <div className="mt-1 text-xs font-medium text-neutral-500">
        {t('contact-information-hint')}
      </div>

      <ContactInformationForm
        user={user}
        className="mt-0"
      />
    </div>
  );
}

export default Content;
