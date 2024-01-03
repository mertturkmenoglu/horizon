import { cn } from '@/lib/cn';
import React, { useId } from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: {
    type: string;
    message?: string;
  };
  hint?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, labelClassName, inputClassName, hint, className, error, ...props },
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
        <textarea
          id={id}
          className={cn(
            'bg-gray-500/10 rounded',
            'p-2',
            {
              'border-red-500': error?.type,
              'focus:border-sky-500': !error?.type,
            },
            'focus:ring focus:ring-sky-500 focus:outline-none',
            'text-midnight',
            'placeholder:text-sm placeholder:font-light',
            'disabled:text-neutral-500 disabled:bg-neutral-400/50 disabled:border-none',
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

TextArea.displayName = 'TextArea';

export default TextArea;
