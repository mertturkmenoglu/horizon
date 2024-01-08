import { AuthActivity } from '@/lib/dto';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Line from './Line';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';

type Props = {
  activity: AuthActivity;
};

function Card({ activity }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'auth-activity' });
  return (
    <div
      className={cn(
        'border border-midnight rounded px-4 py-2',
        'text-midnight font-sans lining-nums text-sm flex sm:space-x-8'
      )}
    >
      <div className="hidden sm:flex items-center">
        {activity.success && <CheckIcon className="size-8 text-green-500" />}
        {!activity.success && <XMarkIcon className="size-8 text-red-500" />}
      </div>
      <div className="space-y-2 w-full">
        <Line
          title={t('date')}
          text={new Date(activity.createdAt).toLocaleString()}
        />

        <Line
          title={t('ip-address')}
          text={activity.ipAddress}
        />

        <Line
          title={t('user-agent')}
          text={activity.userAgent}
        />

        <Line
          title={t('location')}
          text={activity.location}
        />

        <Line
          title={t('success')}
          text={activity.success ? t('success-true') : t('success-false')}
        />

        <Line
          title={t('activity-id')}
          text={activity.id}
        />
      </div>
    </div>
  );
}

export default Card;
