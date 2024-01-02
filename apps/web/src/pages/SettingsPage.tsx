import Outlet from '@/components/Settings/Outlet';
import { Tabs } from '@/components/Settings/Tabs';
import MainLayout from '@/layouts/MainLayout';
import SettingsLayout from '@/layouts/SettingsLayout';

function SettingsPage(): React.ReactElement {
  return (
    <MainLayout>
      <SettingsLayout tabs={<Tabs />}>
        <Outlet />
      </SettingsLayout>
    </MainLayout>
  );
}

export default SettingsPage;
