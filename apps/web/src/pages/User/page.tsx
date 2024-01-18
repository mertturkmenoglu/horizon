import UserInfoCard from '@/components/UserInfoCard';
import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { GetUserByUsernameResponse, TPaginatedResponse } from '@/lib/dto';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useQuery } from '@tanstack/react-query';
import NoResult from './components/NoResult';
import ServiceCard from '@/components/ServiceCard';
import { useTranslation } from 'react-i18next';

type Props = {
  user: GetUserByUsernameResponse;
};

function UserPage({ user }: Props): React.ReactElement {
  const { t } = useTranslation('user');

  const query = useQuery({
    queryKey: ['user-services', user.username],
    queryFn: async () => {
      const res = await api<TPaginatedResponse<GetServiceByIdResponse[]>>(
        `/services/user/${user.username}`
      );
      return res;
    },
    refetchOnWindowFocus: false,
  });

  const isNoResult =
    !query.isLoading && !query.isError && query.data?.data.length === 0;

  return (
    <MainLayout>
      <div className="">
        <div className="">
          <UserInfoCard
            user={user}
            className="mt-8"
          />
        </div>
        {!isNoResult && query.data && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-midnight">
              {t('services')}
            </h2>
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
      </div>
    </MainLayout>
  );
}

export default UserPage;
