import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export default function InspirationBanner({ className }: Props) {
  return (
    <div className={cn('relative hidden sm:block', className)}>
      <img
        src="https://images.unsplash.com/photo-1464219995203-d9e0a71964d6?q=80&w=2670&auto=format&fit=crop"
        className="my-8 aspect-[5] rounded-md object-cover"
        alt=""
        role="presentation"
      />
      <h2 className="absolute bottom-8 left-8 hidden scroll-m-20 rounded-md bg-sky-900/30 px-3 py-2 text-base font-medium tracking-tight text-white sm:flex md:text-2xl">
        Your Service. Your Choice. Your Horizon.
      </h2>
    </div>
  );
}
