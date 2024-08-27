'use client';

import AppMessage from '@/components/blocks/app-message';
import HServiceCard from '@/components/blocks/hservice-card';
import { ListItemDto } from '@/lib/dto';
import Link from 'next/link';

type Props = {
  items: ListItemDto[];
};

export default function Items({ items }: Readonly<Props>) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/services/${item.hserviceId}`}
        >
          <HServiceCard hservice={item.hservice} />
        </Link>
      ))}
      {items.length === 0 && (
        <AppMessage
          emptyMessage="This list is empty."
          showBackButton={false}
          className="col-span-full"
        />
      )}
    </div>
  );
}
