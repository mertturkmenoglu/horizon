import { useAuth } from '@/hooks/useAuth';
import Content from './components/Content';

function PreferencesTabContainer(): React.ReactElement {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return <Content user={user} />;
}

export default PreferencesTabContainer;
