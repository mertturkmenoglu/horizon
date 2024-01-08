import { GetUserByUsernameResponse } from '@/lib/dto';
import { useUserInfo } from './useUserInfo';
import { cn } from '@/lib/cn';
import { Info } from './Info';
import {
  ArrowRightIcon,
  AtSymbolIcon,
  BuildingStorefrontIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  MapPinIcon,
  PencilIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import Button from '../Button';
import { VerifiedIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
      <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 justify-between items-start">
        <div className="flex space-x-8">
          <img
            src={image}
            alt=""
            className="size-36 rounded-full ring ring-offset-2 ring-sky-500"
          />
          <div className="">
            <div className="flex items-center space-x-2">
              <div className="text-midnight font-semibold text-4xl w-fit">
                {user.name}
              </div>

              {user.isVerifiedAccount && (
                <VerifiedIcon className="size-6 text-blue-500" />
              )}
            </div>

            <div className="text-midnight/70 font-semibold text-lg">
              @{user.username}
            </div>

            <div className="flex items-center flex-wrap">
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

        <div className="flex items-center justify-center flex-col mx-auto w-full md:mx-0 md:w-auto">
          <Button
            appearance="midnight"
            className="py-2 flex space-x-2 justify-center items-center min-w-64"
          >
            <AtSymbolIcon className="size-5 text-white" />
            <span>{t('view-contact')}</span>
          </Button>
          {isThisUser && (
            <Button
              appearance="midnight"
              className="mt-2 py-2 flex space-x-2 justify-center items-center min-w-64"
              onClick={() => {
                window.location.href = '/settings?tab=profile';
              }}
            >
              <PencilIcon className="size-5 text-white" />
              <span>{t('edit')}</span>
            </Button>
          )}

          {!isThisUser && (
            <>
              <Button
                appearance="midnight"
                className="mt-2 py-2 flex space-x-2 justify-center items-center min-w-64"
              >
                <EnvelopeIcon className="size-5 text-white" />
                <span>{t('message')}</span>
              </Button>
              <a
                href={`/report?u=${user.username}`}
                className="w-full text-sm mt-2 text-center block hover:underline text-midnight/70"
              >
                {t('block-report')}
              </a>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="text-xl font-bold">{t('about')}</h2>
        <div className="text-lg font-medium mt-1">{description}</div>
      </div>
    </div>
  );
}

export default UserInfoCard;
