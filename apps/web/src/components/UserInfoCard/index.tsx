import { GetUserByUsernameResponse } from '@/lib/dto';
import { useUserInfo } from './useUserInfo';
import { cn } from '@/lib/cn';
import { Info } from './Info';
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
  CheckBadgeIcon,
  MapPinIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import ThisUserActions from './ThisUserActions';
import GeneralActions from './GeneralActions';
import OtherUserActions from './OtherUserActions';
import ShareActions from './ShareActions';

interface UserInfoCardProps {
  user: GetUserByUsernameResponse;
  className?: string;
}

function UserInfoCard({
  user,
  className,
}: UserInfoCardProps): React.ReactElement {
  const { t } = useTranslation('user');
  const { image, description, location, isThisUser } = useUserInfo(user);

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex flex-col items-start justify-between space-y-8 md:flex-row md:space-y-0">
        <div className="flex space-x-8">
          <img
            src={image}
            alt=""
            className="size-36 rounded-full ring ring-sky-500 ring-offset-2"
          />
          <div className="">
            <div className="flex items-center space-x-2">
              <div className="w-fit text-4xl font-semibold text-midnight">
                {user.name}
              </div>

              {user.isVerifiedAccount && (
                <CheckBadgeIcon className="size-6 text-blue-500" />
              )}
            </div>

            <div className="text-lg font-semibold text-midnight/70">
              @{user.username}
            </div>

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
          </div>
        </div>

        <div className="mx-auto flex w-full flex-col items-center justify-center md:mx-0 md:w-auto">
          <GeneralActions />

          {isThisUser && <ThisUserActions />}

          {!isThisUser && <OtherUserActions user={user} />}

          <ShareActions user={user} />
        </div>
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="text-xl font-bold">{t('about')}</h2>
        <div className="mt-1 text-lg font-medium">{description}</div>
      </div>
    </div>
  );
}

export default UserInfoCard;
