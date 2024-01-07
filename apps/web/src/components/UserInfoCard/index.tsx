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

interface UserInfoCardProps {
  user: GetUserByUsernameResponse;
  className?: string;
}

function UserInfoCard({
  user,
  className,
}: UserInfoCardProps): React.ReactElement {
  const { image, description, location, isThisUser } = useUserInfo(user);
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex justify-between items-start">
        <div className="flex space-x-8">
          <img
            src={image}
            alt="Profile Image"
            className="size-36 rounded-full ring ring-offset-2 ring-sky-500"
          />
          <div className="">
            <div className="flex items-center space-x-2">
              <div className="text-midnight font-semibold text-4xl">
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
                text="42 services"
                className="mt-2"
                show={true}
              />

              <Info
                icon={BuildingStorefrontIcon}
                text="Business Account"
                className="mt-2"
                show={user.isBusinessAccount}
              />

              <Info
                icon={CheckBadgeIcon}
                text="Verified Account"
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

        <div className="flex items-center justify-center flex-col">
          <Button
            appearance="midnight"
            className="py-2 flex space-x-2 justify-center items-center min-w-64"
          >
            <AtSymbolIcon className="size-5 text-white" />
            <span>View contact info</span>
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
              <span>Edit</span>
            </Button>
          )}

          {!isThisUser && (
            <>
              <Button
                appearance="midnight"
                className="mt-2 py-2 flex space-x-2 justify-center items-center min-w-64"
              >
                <EnvelopeIcon className="size-5 text-white" />
                <span>Message</span>
              </Button>
              <a
                href={`/report?u=${user.username}`}
                className="w-full text-sm mt-2 text-center block hover:underline text-midnight/70"
              >
                Block or report
              </a>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="text-xl font-bold">About</h2>
        <div className="text-lg font-medium mt-1">{description}</div>
      </div>
    </div>
  );
}

export default UserInfoCard;
