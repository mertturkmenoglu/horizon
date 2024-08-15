import { cn } from '@/lib/utils';
import Link from 'next/link';
import Doodle from './doodle';

type Props = {
  className?: string;
};

export default function ReferToFriend({ className }: Props) {
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col items-center gap-8 md:flex-row md:gap-16 lg:gap-32',
        className
      )}
    >
      <Doodle className="size-[256px] text-sky-500" />
      <div className="flex flex-col justify-center">
        <div className="text-4xl font-semibold">
          Enjoying <span className="text-sky-500">Horizon</span>?
        </div>

        <Link
          href="/referral"
          className="mt-2 rounded-md text-lg font-medium hover:underline hover:decoration-sky-500 hover:decoration-4 hover:underline-offset-8"
        >
          Refer us to a <span className="text-sky-500">friend</span>.
        </Link>
      </div>
    </div>
  );
}
