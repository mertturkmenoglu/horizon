import { cn } from '@/lib/cn';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'w-full py-2',
    'rounded font-bold',
    'focus:ring focus:outline-none focus:ring-offset-2',
  ],
  {
    variants: {
      appearance: {
        red: ['bg-red-700', 'text-white', 'focus:ring-red-700'],
        sky: ['bg-sky-600', 'text-white', 'focus:ring-sky-600'],
        green: ['bg-green-600', 'text-white', 'focus:ring-green-600'],
        midnight: ['bg-midnight', 'text-white', 'focus:ring-midnight'],
        gray: ['bg-gray-400/70', 'text-gray-500/70', 'focus:ring-gray-400/70'],
      },
    },
    defaultVariants: {
      appearance: 'sky',
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {}

function Button({
  appearance,
  className,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <button
      className={cn(buttonVariants({ appearance }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
