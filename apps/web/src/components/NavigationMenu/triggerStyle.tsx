import { cn } from '@/lib/cn';
import { cva } from 'class-variance-authority';

const classes = cn(
  'group inline-flex h-9 w-max items-center justify-center rounded-md',
  'bg-white px-4 py-2 text-sm font-medium',
  'transition-colors hover:bg-neutral-400/10 hover:text-midnight',
  'focus:ring focus:ring-sky-500 focus:ring-offset-2 focus:outline-none',
  'disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral-400/20 data-[state=open]:bg-neutral-400/20'
);

export const navigationMenuTriggerStyle = cva(classes);
