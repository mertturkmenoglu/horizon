import { cn } from '@/lib/cn';

type ChipProps = TProps & {
  type: 'price' | 'pro' | 'new' | 'topRated';
  text: string;
};

function Chip({ className, type, text }: ChipProps): React.ReactElement {
  return (
    <div
      className={cn(
        'w-fit text-nowrap rounded-md border px-2 py-[1px] text-center text-xs lining-nums',
        {
          'border-sky-700 bg-sky-50 text-sky-700': type === 'price',
          'border-indigo-700 bg-indigo-50 text-indigo-700': type === 'pro',
          'border-amber-700 bg-amber-50 text-amber-700': type === 'new',
          'border-green-700 bg-green-50 text-green-700': type === 'topRated',
        },
        className
      )}
    >
      {text}
    </div>
  );
}

export default Chip;
