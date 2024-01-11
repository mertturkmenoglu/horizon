import Spinner from '@/components/Spinner';
import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ServiceDetailPage(): React.ReactElement {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      return await api<{ data: GetServiceByIdResponse }>('/services/' + id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (query.isLoading) {
    return (
      <MainLayout>
        <div className="my-64 flex items-center justify-center">
          <Spinner className="size-12" />
        </div>
      </MainLayout>
    );
  }

  if (query.isError) {
    return (
      <MainLayout>
        <div>An error happened</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>Service Detail Page</div>
      <div>id: {id}</div>
      {query.data && <pre>{JSON.stringify(query.data.data, null, 2)}</pre>}
    </MainLayout>
  );
}

export default ServiceDetailPage;
