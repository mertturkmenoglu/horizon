import UserInfoCard from '@/components/UserInfoCard';
import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { GetUserByUsernameResponse } from '@/lib/dto';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

function UserPageContainer(): React.ReactElement {
  const { username } = useParams();

  const userQuery = useQuery({
    queryKey: ['user', username],
    enabled: username !== undefined,
    queryFn: async () => {
      const res = await api<{ data: GetUserByUsernameResponse }>(
        `/users/${username}`
      );
      return res.data;
    },
  });

  if (
    username === undefined ||
    userQuery.isError ||
    (!userQuery.isLoading && !userQuery.data)
  ) {
    return <Navigate to="/not-found" />;
  }

  if (userQuery.isLoading) {
    return (
      <MainLayout>
        <div>loading</div>
      </MainLayout>
    );
  }

  return <>{userQuery.data && <UserPage user={userQuery.data} />}</>;
}

interface UserPageProps {
  user: GetUserByUsernameResponse;
}

function UserPage({ user }: UserPageProps): React.ReactElement {
  const { t } = useTranslation('user');
  return (
    <MainLayout>
      <div className="">
        <div className="">
          <UserInfoCard
            user={user}
            className="mt-8"
          />
        </div>
        <div className="p-4 mt-8">
          <div className="flex flex-col justify-center items-center h-full">
            <SquaresPlusIcon className="size-12 text-sky-600" />
            <div className="mt-2 text-2xl text-midnight/70">
              {t('empty-result')}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserPageContainer;
