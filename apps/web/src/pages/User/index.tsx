import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { GetUserByUsernameResponse, TResponse } from '@/lib/dto';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import UserPage from './page';
import Spinner from '@/components/Spinner';

function UserPageContainer(): React.ReactElement {
  const { username } = useParams();

  const userQuery = useQuery({
    queryKey: ['user', username],
    enabled: username !== undefined,
    queryFn: async () => {
      const res = await api<TResponse<GetUserByUsernameResponse>>(
        `/users/${username}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
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
        <div className="my-64 flex items-center justify-center">
          <Spinner className="size-12" />
        </div>
      </MainLayout>
    );
  }

  return <>{userQuery.data && <UserPage user={userQuery.data} />}</>;
}

export default UserPageContainer;
