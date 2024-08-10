import { useTranslation } from 'react-i18next';
import { useUserServicesQuery } from '../hooks/useUserServicesQuery';
import ServiceCard from '@/components/ServiceCard';
import NoResult from './NoResult';
import Spinner from '@/components/Spinner';
import GenericError from '@/components/GenericError';

type Props = {
  username: string;
};

function Services({ username }: Props): React.ReactElement {
  const { t } = useTranslation('user');
  const query = useUserServicesQuery(username);

  const isNoResult =
    !query.isLoading && !query.isError && query.data?.data.length === 0;

  if (query.isLoading) {
    return (
      <div className="my-32 flex items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="my-32 flex items-center justify-center">
        <GenericError />
      </div>
    );
  }

  return (
    <>
      {!isNoResult && query.data && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-midnight">{t('services')}</h2>
          <div className="grid grid-cols-5 gap-4">
            {query.data.data.map((s) => (
              <ServiceCard service={s} />
            ))}
          </div>
        </div>
      )}
      {isNoResult && (
        <div className="mt-8 p-4">
          <NoResult />
        </div>
      )}
    </>
  );
}

export default Services;
