import { cn } from '@/lib/cn';
import React, { useId } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: {
    type: string;
    message?: string;
  };
  hint?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, labelClassName, inputClassName, className, hint, error, ...props },
    ref
  ) => {
    const id = useId();

    return (
      <div className={cn('flex flex-col bg-transparent', className)}>
        <label
          htmlFor={id}
          className={cn(
            'block text-sm font-semibold text-black',
            labelClassName
          )}
        >
          {label}
        </label>
        <input
          id={id}
          className={cn(
            'bg-gray-900/10 rounded',
            'px-2 py-2',
            {
              'border-red-500': error?.type,
              'focus:border-sky-500': !error?.type,
            },
            'focus:ring focus:ring-sky-500 focus:outline-none',
            'placeholder:text-sm placeholder:font-light',
            'disabled:text-neutral-500 disabled:bg-neutral-400/60',
            inputClassName
          )}
          {...props}
          ref={ref}
        />
        {hint !== undefined && (
          <span className="mt-1 text-xs font-medium text-neutral-500">
            {hint}
          </span>
        )}
        {error?.type && (
          <span className="mt-2 text-sm font-medium text-red-500">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'TextField';

export default Input;
