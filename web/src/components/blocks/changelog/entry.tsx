import { cn } from '@/lib/utils';
import { GitCommitHorizontalIcon } from 'lucide-react';

type ChangelogEntryProps = {
  className?: string;
  time: string;
  title: string;
  content: React.ReactNode;
};

export default function ChangelogEntry({
  time,
  title,
  content,
  className,
}: Readonly<ChangelogEntryProps>) {
  return (
    <div
      className={cn(
        'relative flex min-h-40 gap-8 border-l border-black',
        className
      )}
    >
      <GitCommitHorizontalIcon className="absolute -left-4 -top-8 size-8" />
      <div className="-mt-8 ml-8">
        <div className="text-sm text-muted-foreground">{time}</div>
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-2 text-base text-muted-foreground">{content}</div>
      </div>
    </div>
  );
}
