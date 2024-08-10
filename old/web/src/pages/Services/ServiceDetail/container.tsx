import Spinner from '@/components/Spinner';
import MainLayout from '@/layouts/MainLayout';
import { useParams } from 'react-router-dom';
import ServiceDetailPage from './page';
import { useServiceQuery } from './hooks/useServiceQuery';
import GenericError from '@/components/GenericError';

function Container(): React.ReactElement {
  const { id } = useParams();
  const query = useServiceQuery(id);

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
        <div className="my-64 flex items-center justify-center">
          <GenericError />
        </div>
      </MainLayout>
    );
  }

  if (!query.data) {
    return <></>;
  }

  return <ServiceDetailPage service={query.data} />;
}

export default Container;
