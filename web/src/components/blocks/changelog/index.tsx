import { cn } from '@/lib/utils';
import { GitCommitHorizontalIcon } from 'lucide-react';

type ChagelogRootProps = {
  className?: string;
  children: React.ReactNode;
};

function ChangelogRoot({ className, children }: ChagelogRootProps) {
  return (
    <div className={cn(className)}>
      <h2 className="mt-4 text-3xl font-medium tracking-tight lg:text-4xl">
        Changelog
      </h2>

      <div className="my-16 ml-4 space-y-8">{children}</div>
    </div>
  );
}

type ChangelogEntryProps = {
  className?: string;
  time: string;
  title: string;
  content: React.ReactNode;
};

function ChangelogEntry({
  time,
  title,
  content,
  className,
}: ChangelogEntryProps) {
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

const Changelog = {
  Root: ChangelogRoot,
  Entry: ChangelogEntry,
};

export default Changelog;
