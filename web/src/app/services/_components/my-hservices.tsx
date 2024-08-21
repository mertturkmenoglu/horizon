'use client';

import AppMessage from '@/components/blocks/app-message';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/api';
import { HServiceWithoutUserResponseDto } from '@/lib/dto';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import HServiceCard from './hservice-card';

type Props = {
  className?: string;
};

export default function MyHServices({ className }: Props) {
  const query = useQuery({
    queryKey: ['my-hservices'],
    queryFn: async () => {
      const res = await api
        .get('hservices/?page=1&pageSize=25')
        .json<{ data: HServiceWithoutUserResponseDto[] }>();
      return res;
    },
  });

  if (query.isLoading) {
    return (
      <div className={cn('grid grid-cols-1 gap-8 md:grid-cols-2', className)}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton
            className="h-32 w-full"
            key={i}
          />
        ))}
      </div>
    );
  }

  if (query.isError) {
    throw query.error;
  }

  if (!query.data) {
    return <></>;
  }

  if (query.data.data.length === 0) {
    return (
      <AppMessage
        emptyMessage={
          <div className="text-center">
            <div>You haven&apos;t created any services yet.</div>

            <div>
              Click to &apos;Create New Service&apos; to enlist your service.
            </div>
          </div>
        }
        className="mx-auto my-16"
        showBackButton={false}
      />
    );
  }

  return (
    <div className={cn('grid grid-cols-1 gap-8 md:grid-cols-2', className)}>
      {query.data.data.map((hservice) => (
        <Link
          key={hservice.id}
          href={`/services/${hservice.id}`}
          className="block"
        >
          <HServiceCard hservice={hservice} />
        </Link>
      ))}
    </div>
  );
}
