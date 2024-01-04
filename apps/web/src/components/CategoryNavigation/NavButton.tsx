import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

type El = React.ElementRef<'button'>;
type Props = React.ComponentPropsWithoutRef<'button'> & {
  icon: TwIcon | LucideIcon;
};

const NavButton = React.forwardRef<El, Props>(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('border-4 border-white', className)}
        {...props}
      >
        <Icon className="size-10 bg-neutral-400/20 rounded-full p-2 mr-2" />
      </button>
    );
  }
);

NavButton.displayName = 'NavButton';

export default NavButton;
