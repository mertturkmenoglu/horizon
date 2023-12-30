import { cn } from '@/lib/cn';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const bannerVariants = cva(['w-full px-4 py-2', 'text-sm'], {
  variants: {
    appearance: {
      warning: ['bg-yellow-400 text-midnight'],
      error: ['bg-red-400 text-midnight'],
      announcement: ['bg-slate-400 text-slate-700'],
    },
  },
  defaultVariants: {
    appearance: 'announcement',
  },
});

type BannerVariantProps = VariantProps<typeof bannerVariants>;

interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BannerVariantProps {}

function Banner({
  appearance,
  className,
  children,
  ...props
}: BannerProps): React.ReactElement {
  return (
    <div
      className={cn(bannerVariants({ appearance }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Banner;
