import { cn } from '@/lib/cn';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Doodle from './doodle';

type El = React.ElementRef<'div'>;
type Props = React.ComponentPropsWithoutRef<'div'>;

const ReferToFriend = React.forwardRef<El, Props>(
  ({ className, ...props }, ref) => {
    const { t } = useTranslation('common', {
      keyPrefix: 'refer-to-friend',
    });
    return (
      <div
        ref={ref}
        className={cn('flex max-w-3xl items-center', className)}
        {...props}
      >
        <Doodle className="size-[256px] text-sky-600" />
        <div className="ml-32 flex flex-col justify-center">
          <div className="text-4xl font-semibold">
            <Trans
              i18nKey="question"
              defaults={t('question')}
              components={{ span: <span className="text-sky-600" /> }}
            />
          </div>

          <Link
            to="/referral"
            className="mt-2 rounded-md text-lg font-medium hover:underline hover:decoration-sky-700 hover:decoration-4 hover:underline-offset-8"
          >
            <Trans
              i18nKey="cta"
              defaults={t('cta')}
              components={{ span: <span className="text-sky-700" /> }}
            />
          </Link>
        </div>
      </div>
    );
  }
);

ReferToFriend.displayName = 'ReferToFriend';

export default ReferToFriend;
