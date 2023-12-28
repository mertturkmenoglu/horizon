import { cn } from '@/lib/cn';
import React from 'react';

export interface CookieButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CookieButton = React.forwardRef<HTMLButtonElement, CookieButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'border-2 border-blue-500',
          'px-4 py-2',
          'font-bold text-blue-500',
          'hover:bg-blue-500 hover:text-white',
          'focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:text-white',
          'transition-all duration-250',
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

CookieButton.displayName = 'CookieButton';

export default CookieButton;
