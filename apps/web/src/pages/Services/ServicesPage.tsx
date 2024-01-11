import Breadcrumb from '@/components/Breadcrumb';
import Spinner from '@/components/Spinner';
import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

function ServicesPage(): React.ReactElement {
  const { t } = useTranslation('categories', { keyPrefix: 'explore' });

  const query = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      return await api<{ data: GetServiceByIdResponse[] }>('/services/');
    },
    refetchOnWindowFocus: false,
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
      <Breadcrumb
        items={[{ href: '/services/', text: t('services') }]}
        className="mt-8"
      />
      {query.data && (
        <pre className="mt-16">{JSON.stringify(query.data.data, null, 2)}</pre>
      )}
    </MainLayout>
  );
}

export default ServicesPage;
