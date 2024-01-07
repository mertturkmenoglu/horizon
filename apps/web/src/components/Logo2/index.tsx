import { cn } from '@/lib/cn';
import React from 'react';

type El = React.ElementRef<'div'>;
type Props = React.ComponentPropsWithoutRef<'div'> & {
  dist: number;
};

const Logo2 = React.forwardRef<El, Props>(
  ({ className, dist, ...props }, ref) => {
    const commonStyles = cn(
      '-skew-x-[32deg] h-full w-full -rotate-[24deg] shadow-2xl'
    );
    return (
      <div
        ref={ref}
        className={cn('aspect-[8]', className)}
        {...props}
      >
        <div className={cn(commonStyles, 'bg-red-500 shadow-red-500/80')} />
        <div
          className={cn(commonStyles, 'bg-sky-500 shadow-sky-500/80')}
          style={{
            marginTop: `${dist}rem`,
          }}
        />
      </div>
    );
  }
);

Logo2.displayName = 'Logo2';

export default Logo2;
