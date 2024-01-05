import { cn } from '@/lib/cn';

type ChipProps = TProps & {
  type: 'price' | 'pro' | 'new' | 'topRated';
  text: string;
};

function Chip({ className, type, text }: ChipProps): React.ReactElement {
  return (
    <div
      className={cn(
        'lining-nums px-2 w-fit rounded-md text-sm border',
        {
          'bg-sky-50 border-sky-500  text-sky-500': type === 'price',
          'bg-indigo-50 border-indigo-500  text-indigo-500': type === 'pro',
          'bg-amber-50 border-amber-500  text-amber-500': type === 'new',
          'bg-green-50 border-green-500  text-green-500': type === 'topRated',
        },
        className
      )}
    >
      {text}
    </div>
  );
}

export default Chip;
