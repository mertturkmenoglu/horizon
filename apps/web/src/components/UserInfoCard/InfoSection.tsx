import { GetUserByUsernameResponse } from '@/lib/dto';
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
  CheckBadgeIcon,
  MapPinIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Info } from './Info';

type Props = {
  user: GetUserByUsernameResponse;
  location: string;
};

function InfoSection({ user, location }: Props): React.ReactElement {
  const { t } = useTranslation('user');

  return (
    <div className="flex flex-wrap items-center">
      <Info
        icon={SquaresPlusIcon}
        text={t('services-badge', { count: 42 })}
        className="mt-2"
        show={true}
      />

      <Info
        icon={BuildingStorefrontIcon}
        text={t('business-account')}
        className="mt-2"
        show={user.isBusinessAccount}
      />

      <Info
        icon={CheckBadgeIcon}
        text={t('verified-account')}
        className="mt-2"
        show={user.isVerifiedAccount}
      />

      <Info
        icon={MapPinIcon}
        text={location}
        className="mt-2"
        show={location !== ''}
      />

      <Info
        icon={ArrowRightIcon}
        text={user.gender}
        className="mt-2"
        show={user.gender !== ''}
      />
    </div>
  );
}

export default InfoSection;
