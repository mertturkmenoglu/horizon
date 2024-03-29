import { cn } from '@/lib/cn';
import { AuthActivity } from '@/lib/dto';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Line from './Line';

type Props = {
  activity: AuthActivity;
};

function Card({ activity }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'auth-activity' });

  const type = useMemo(() => {
    const at = activity.activityType;
    if (at === 0) return t('type-login');
    if (at === 1) return t('type-logout');
    if (at === 2) return t('type-password-change');
    if (at === 3) return t('type-password-reset');
    if (at === 4) return t('type-email-verification');
    return t('type-unknown');
  }, [activity.activityType, t]);

  return (
    <div
      className={cn(
        'rounded border border-midnight px-4 py-2',
        'flex font-sans text-sm lining-nums text-midnight sm:space-x-8'
      )}
    >
      <div className="hidden items-center sm:flex">
        {activity.success && <CheckIcon className="size-8 text-green-500" />}
        {!activity.success && <XMarkIcon className="size-8 text-red-500" />}
      </div>
      <div className="w-full space-y-2">
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

        <Line
          title={t('activity-type')}
          text={type}
        />
      </div>
    </div>
  );
}

export default Card;
