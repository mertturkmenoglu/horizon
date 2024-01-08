import { GetMeResponse } from '@/lib/dto';
import ProfileImageForm from './ProfileImageForm';
import ProfileForm from './ProfileForm';
import ContactInformationForm from './ContactInformationForm';
import { useTranslation } from 'react-i18next';

type Props = {
  user: GetMeResponse;
};

function Content({ user }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <hr className="w-full h-[2px] bg-black" />

      <ProfileImageForm className="max-w-lg mt-4" />

      <h2 className="text-2xl font-semibold mt-8">{t('about-you')}</h2>
      <hr className="w-full h-[2px] bg-black" />

      <ProfileForm
        className="mt-4"
        user={user}
      />

      <h2 className="text-2xl font-semibold mt-8">
        {t('contact-information')}
      </h2>
      <hr className="w-full h-[2px] bg-black" />
      <div className="text-xs text-neutral-500 font-medium mt-1">
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
