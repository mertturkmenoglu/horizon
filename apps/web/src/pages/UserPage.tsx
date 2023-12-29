import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { GetMeResponse } from '@/lib/dto';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

function UserPageContainer(): React.ReactElement {
  const { username } = useParams();

  const userQuery = useQuery({
    queryKey: ['user', username],
    enabled: username !== undefined,
    queryFn: () => {
      return api<GetMeResponse>(`/users/${username}`);
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
  user: GetMeResponse;
}

function UserPage({ user }: UserPageProps): React.ReactElement {
  return (
    <MainLayout>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </MainLayout>
  );
}

export default UserPageContainer;
