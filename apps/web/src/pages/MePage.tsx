import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

function MePage(): React.ReactElement {
  const { loading, user } = useAuth();

  if (loading || !user) {
    return <></>;
  }

  return <Navigate to={`/user/${user.username}`} />;
}

export default MePage;
