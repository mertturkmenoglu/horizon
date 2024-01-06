import { AuthActivity } from '@/lib/dto';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Line from './Line';

type Props = {
  activity: AuthActivity;
};

function Card({ activity }: Props): React.ReactElement {
  return (
    <div className="border border-midnight rounded px-4 py-2 text-midnight font-sans lining-nums text-sm flex sm:space-x-8">
      <div className="hidden sm:flex items-center">
        {activity.success && <CheckIcon className="size-8 text-green-500" />}
        {!activity.success && <XMarkIcon className="size-8 text-red-500" />}
      </div>
      <div className="space-y-2 w-full">
        <Line
          title="Date"
          text={new Date(activity.createdAt).toLocaleString()}
        />

        <Line
          title="IP Address"
          text={activity.ipAddress}
        />

        <Line
          title="User Agent"
          text={activity.userAgent}
        />

        <Line
          title="Location"
          text={activity.location}
        />

        <Line
          title="Success"
          text={activity.success ? 'True' : 'False'}
        />

        <Line
          title="Activity ID"
          text={activity.id}
        />
      </div>
    </div>
  );
}

export default Card;
