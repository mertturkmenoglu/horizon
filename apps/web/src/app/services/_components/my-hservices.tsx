'use client';

import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

type Props = {
  className?: string;
};

export default function MyHServices({ className }: Props) {
  const query = useQuery({
    queryKey: ['my-hservices'],
    queryFn: async () => {
      const res = await api.get('hservices/?page=1&pageSize=25').json();
      return res;
    },
  });

  if (!query.data) {
    return <></>;
  }

  return (
    <div className={cn(className)}>
      <div>My Services</div>
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </div>
  );
}
