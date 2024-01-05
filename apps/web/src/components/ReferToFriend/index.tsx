import { cn } from '@/lib/cn';
import React from 'react';
import Doodle from './doodle';

type El = React.ElementRef<'div'>;
type Props = React.ComponentPropsWithoutRef<'div'>;

const ReferToFriend = React.forwardRef<El, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex max-w-3xl items-center', className)}
        {...props}
      >
        <Doodle className="size-[256px] text-sky-500" />
        <div className="flex flex-col justify-center ml-32">
          <div className="text-4xl font-semibold">
            Enjoying <span className="text-sky-500">Horizon</span>?
          </div>

          <a
            href="/referral"
            className="mt-2 text-lg hover:underline hover:underline-offset-8 hover:decoration-sky-500 hover:decoration-4 rounded-md"
          >
            Refer us to a <span className="text-sky-500">friend</span>.
          </a>
        </div>
      </div>
    );
  }
);

ReferToFriend.displayName = 'ReferToFriend';

export default ReferToFriend;
