import HServiceCard from '@/components/blocks/hservice-card';
import { HServiceResponseDto } from '@/lib/dto';
import Link from 'next/link';

type Props = {
  dataKey: 'new' | 'popular' | 'featured' | 'favorites';
  data: HServiceResponseDto[];
};

function getTitle(type: Props['dataKey']) {
  switch (type) {
    case 'new':
      return 'New Locations';
    case 'popular':
      return 'Popular Locations';
    case 'featured':
      return 'Featured Locations';
    case 'favorites':
      return 'Favorite Locations';
  }
}

export default async function HServicesGrid({ dataKey: key, data }: Props) {
  const title = getTitle(key);
  const sliced = data.slice(0, 6);
  const isEmpty = sliced.length === 0;

  return (
    <div className="mx-auto">
      <h2 className="mt-12 scroll-m-20 text-2xl font-semibold tracking-tighter text-accent-foreground lg:text-3xl">
        {title}
      </h2>

      <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isEmpty && <div>No data available.</div>}
        {!isEmpty &&
          sliced.map((hservice) => (
            <Link
              key={hservice.id}
              href={`/services/${hservice.id}`}
            >
              <HServiceCard hservice={hservice} />
            </Link>
          ))}
      </div>
    </div>
  );
}
