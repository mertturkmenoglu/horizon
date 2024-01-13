import ServiceCard from '@/components/ServiceCard';
import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { SearchResult } from '@/lib/dto/search';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

function SearchPage(): React.ReactElement {
  const [searchParams] = useSearchParams();
  const term = searchParams.get('term');

  const query = useQuery({
    queryKey: ['search', term],
    queryFn: async () => {
      const res = await api<{ data: SearchResult }>('/search/', {
        query: {
          term,
        },
      });
      return res.data;
    },
    enabled: !!term,
  });

  if (query.isLoading || query.isError || !query.data) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-5 gap-4">
        {query.data.hits.hits.map((hit) => (
          <ServiceCard
            service={hit._source}
            key={hit._id}
          />
        ))}
      </div>
    </MainLayout>
  );
}
export default SearchPage;
