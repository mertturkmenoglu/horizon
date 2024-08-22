'use client';

import AppMessage from '@/components/blocks/app-message';
import HServiceCard from '@/components/blocks/hservice-card';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/api';
import { HServiceResponseDto } from '@/lib/dto';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

type Props = {
  username: string;
};

export default function HServicesList({ username }: Props) {
  const query = useQuery({
    queryKey: ['hservices-list', username],
    queryFn: async () => {
      const res = await api
        .get(`hservices/user/${username}?page=1&pageSize=25`)
        .json<{ data: HServiceResponseDto[] }>();
      return res;
    },
  });

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
        emptyMessage="No services found"
        className="mx-auto my-16"
        showBackButton={false}
      />
    );
  }

  return (
    <div>
      <h2 className="my-8 text-3xl font-semibold tracking-tight lg:text-4xl">
        Services
      </h2>

      <div className={cn('grid grid-cols-1 gap-8 md:grid-cols-3')}>
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
    </div>
  );
}
