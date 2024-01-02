import { useSearchParams } from 'react-router-dom';
import { tabs } from './mapTabs';

function Outlet(): React.ReactElement {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'account';
  const Component = tabs.find((t) => t.id === tab)?.component ?? <></>;
  return <>{Component}</>;
}

export default Outlet;
