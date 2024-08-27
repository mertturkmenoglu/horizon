import { cn } from '@/lib/utils';
import ChangelogEntry from './entry';

type ChagelogRootProps = {
  className?: string;
  children: React.ReactNode;
};

function ChangelogRoot({ className, children }: Readonly<ChagelogRootProps>) {
  return (
    <div className={cn(className)}>
      <h2 className="mt-4 text-3xl font-medium tracking-tight lg:text-4xl">
        Changelog
      </h2>

      <div className="my-16 ml-4 space-y-8">{children}</div>
    </div>
  );
}

const Changelog = {
  Root: ChangelogRoot,
  Entry: ChangelogEntry,
};

export default Changelog;
