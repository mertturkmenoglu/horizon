import Convsersations from '@/components/Conversations';
import MainLayout from '@/layouts/MainLayout';
import { Outlet } from 'react-router-dom';

function Layout(): React.ReactElement {
  return (
    <MainLayout
      showFooter={false}
      isFullWidth={true}
    >
      <div className="mt-8 flex h-full w-full gap-4">
        <div className="w-96 rounded-lg border border-midnight/20 p-4">
          <Convsersations />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}

export default Layout;
