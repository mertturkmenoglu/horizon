import { cn } from '@/lib/cn';
import React, { useId } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: {
    type: string;
    message?: string;
  };
  bordered?: boolean;
  hint?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const fileClasses = cn(
  'file:mr-4 file:rounded-md file:border-0 file:px-2 file:py-1 file:text-sm',
  'file:bg-sky-50 file:font-semibold file:text-sky-700 hover:bg-sky-100',
  'bg-transparent hover:cursor-pointer hover:file:cursor-pointer'
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelClassName,
      inputClassName,
      className,
      hint,
      error,
      type,
      bordered = false,
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className={cn('flex flex-col bg-transparent', className)}>
        <label
          htmlFor={id}
          className={cn(
            'block text-sm font-semibold text-midnight',
            labelClassName
          )}
        >
          {label}
        </label>
        <input
          id={id}
          className={cn(
            'rounded bg-gray-500/10',
            'px-2 py-2 lining-nums',
            { 'border border-midnight': bordered },
            {
              'border-red-500': error?.type,
              'focus:border-sky-500': !error?.type,
            },
            {
              [fileClasses]: type === 'file',
            },
            'focus:outline-none focus:ring focus:ring-sky-500',
            'placeholder:text-sm placeholder:font-light',
            'disabled:border-none disabled:bg-neutral-400/50 disabled:text-neutral-500',
            inputClassName
          )}
          type={type}
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
