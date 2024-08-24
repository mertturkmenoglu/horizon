import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton
          className="h-32 w-full"
          key={i}
        />
      ))}
    </div>
  );
}
