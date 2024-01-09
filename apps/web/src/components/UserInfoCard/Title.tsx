import { GetUserByUsernameResponse } from '@/lib/dto';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

type Props = {
  user: GetUserByUsernameResponse;
};

function Title({ user }: Props): React.ReactElement {
  return (
    <>
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
    </>
  );
}

export default Title;
