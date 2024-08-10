import MainLayout from '@/layouts/MainLayout';
import { Navigate, useParams } from 'react-router-dom';
import UserPage from './page';
import Spinner from '@/components/Spinner';
import { useUserQuery } from './hooks/useUserQuery';

function UserPageContainer(): React.ReactElement {
  const { username } = useParams();
  const query = useUserQuery(username);

  if (
    username === undefined ||
    query.isError ||
    (!query.isLoading && !query.data)
  ) {
    return <Navigate to="/not-found" />;
  }

  if (query.isLoading) {
    return (
      <MainLayout>
        <div className="my-64 flex items-center justify-center">
          <Spinner className="size-12" />
        </div>
      </MainLayout>
    );
  }

  return <>{query.data && <UserPage user={query.data} />}</>;
}

export default UserPageContainer;
