import Conversations from '@/components/Conversations';
import MainLayout from '@/layouts/MainLayout';
import { Outlet } from 'react-router-dom';

function Layout(): React.ReactElement {
  return (
    <MainLayout
      showFooter={false}
      isFullWidth={true}
    >
      <div className="mt-8 flex h-[85vh] w-full gap-4 md:h-[90vh]">
        <div className="w-96 overflow-y-auto p-4">
          <Conversations />
        </div>
        <div className="h-[85vh] w-full gap-4 overflow-y-auto md:h-[90vh]">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}

export default Layout;
