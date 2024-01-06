import { useAuth } from '@/hooks/useAuth';
import Content from './Content';

function AccountTabContainer(): React.ReactElement {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return <Content user={user} />;
}

export default AccountTabContainer;
