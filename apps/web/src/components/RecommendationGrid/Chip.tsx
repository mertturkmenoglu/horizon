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
          'border-sky-500 bg-sky-50  text-sky-500': type === 'price',
          'border-indigo-500 bg-indigo-50  text-indigo-500': type === 'pro',
          'border-amber-500 bg-amber-50  text-amber-500': type === 'new',
          'border-green-500 bg-green-50  text-green-500': type === 'topRated',
        },
        className
      )}
    >
      {text}
    </div>
  );
}

export default Chip;
