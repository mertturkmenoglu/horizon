import { cn } from '@/lib/utils';
import Link from 'next/link';
import Doodle from './doodle';

type Props = {
  className?: string;
};

export default function ReferToFriend({ className }: Props) {
  return (
    <div className={cn('flex max-w-3xl items-center', className)}>
      <Doodle className="size-[256px] text-sky-600" />
      <div className="ml-32 flex flex-col justify-center">
        <div className="text-4xl font-semibold">
          Enjoying <span className="text-sky-600">Horizon</span>?
        </div>

        <Link
          href="/referral"
          className="mt-2 rounded-md text-lg font-medium hover:underline hover:decoration-sky-700 hover:decoration-4 hover:underline-offset-8"
        >
          Refer us to a <span className="text-sky-700">friend</span>.
        </Link>
      </div>
    </div>
  );
}
