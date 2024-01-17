import { useParams } from 'react-router-dom';
import { tabs } from './mapTabs';

function SettingsOutlet(): React.ReactElement {
  const { tab } = useParams();
  const tabId = tab ?? 'account';
  const Component = tabs.find((t) => t.id === tabId)?.component ?? <></>;
  return <>{Component}</>;
}

export default SettingsOutlet;
