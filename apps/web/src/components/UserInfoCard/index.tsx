import { GetUserByUsernameResponse } from '@/lib/dto';
import { useUserInfo } from './useUserInfo';
import { cn } from '@/lib/cn';
import { Info } from './Info';
import {
  BuildingStorefrontIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  HomeIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import Button from '../Button';

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
    <div className={cn('p-4 flex flex-col items-center', className)}>
      <img
        src={image}
        alt="Profile Image"
        className="size-32 rounded-full ring ring-offset-2 ring-sky-500 mt-8"
      />
      <div className="mt-4 text-midnight font-semibold text-xl w-full">
        {user.name}
      </div>
      <div className="text-midnight/70 font-semibold text-sm w-full">
        @{user.username}
      </div>
      <div className="border-y border-y-midnight/50 mt-2 py-2 w-full">
        <div className="text-sm">{description}</div>
      </div>

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
        icon={EnvelopeIcon}
        text={user.contactInformation.email}
        className="mt-2"
        show={user.contactInformation.email !== ''}
      />

      <Info
        icon={PhoneIcon}
        text={user.contactInformation.phone}
        className="mt-2"
        show={user.contactInformation.phone !== ''}
      />

      <Info
        icon={HomeIcon}
        text={user.contactInformation.address}
        className="mt-2"
        show={user.contactInformation.address !== ''}
      />

      <Info
        icon={LinkIcon}
        text={user.contactInformation.other}
        className="mt-2"
        show={user.contactInformation.other !== ''}
      />

      <Info
        icon={SquaresPlusIcon}
        text="0 services"
        className="mt-2"
        show={true}
      />

      {isThisUser && (
        <Button
          appearance="sky"
          className="mt-4 py-2 flex space-x-2 justify-center items-center w-32"
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
            appearance="sky"
            className="mt-4 py-2 flex space-x-2 justify-center items-center w-32"
          >
            <EnvelopeIcon className="size-5 text-white" />
            <span>Message</span>
          </Button>
          <a
            href={`/report?u=${user.username}`}
            className="w-full text-sm mt-2 hover:underline text-midnight/70"
          >
            Block or report
          </a>
        </>
      )}
    </div>
  );
}

export default UserInfoCard;
