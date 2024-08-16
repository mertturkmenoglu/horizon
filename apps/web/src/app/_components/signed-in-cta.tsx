import QuickActions from '@/components/blocks/quick-actions';
import ReferToFriend from '@/components/blocks/refer-to-friend';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  fullName: string;
};

export default function SignedInCta({ className, fullName }: Props) {
  return (
    <div className={cn('', className)}>
      <h2 className="mt-8 text-4xl font-bold">Hey {fullName}</h2>
      <div className="mt-2 text-lg font-semibold">How can we help you?</div>

      <QuickActions className="mt-8" />
      <ReferToFriend className="mx-auto mt-0" />
    </div>
  );
}
