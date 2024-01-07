import { useAuth } from '@/hooks/useAuth';
import Content from './Content';

function LocationTabContainer(): React.ReactElement {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return <Content user={user} />;
}

export default LocationTabContainer;
