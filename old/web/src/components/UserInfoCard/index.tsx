import { cn } from '@/lib/cn';
import { GetUserByUsernameResponse } from '@/lib/dto';
import { useTranslation } from 'react-i18next';
import GeneralActions from './GeneralActions';
import InfoSection from './InfoSection';
import OtherUserActions from './OtherUserActions';
import ShareActions from './ShareActions';
import ThisUserActions from './ThisUserActions';
import Title from './Title';
import { useUserInfo } from './useUserInfo';

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
          <div>
            <Title user={user} />
            <InfoSection
              user={user}
              location={location}
            />
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
