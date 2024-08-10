import { Tabs } from './components/Tabs';
import MainLayout from '@/layouts/MainLayout';
import { Navigate, Outlet, useParams } from 'react-router-dom';

function SettingsPage(): React.ReactElement {
  const { tab } = useParams();

  if (tab === undefined) {
    return <Navigate to="/settings/account" />;
  }

  return (
    <MainLayout>
      <div className="mt-8 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2">
          <Tabs />
        </div>
        <div className="col-span-12 mt-8 px-4 lg:col-span-10 lg:mt-0">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}

export default SettingsPage;
