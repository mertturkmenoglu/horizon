import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container my-16">
      <Skeleton className="size-24 rounded-xl" />
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        <div>
          <Skeleton className="mt-4 h-12 rounded-xl" />
          <Skeleton className="mt-2 h-8 rounded-xl" />
          <Skeleton className="mt-2 h-4 rounded-xl" />
        </div>
        <div className="flex h-32 flex-col-reverse items-stretch gap-4 md:flex-row md:justify-end">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
