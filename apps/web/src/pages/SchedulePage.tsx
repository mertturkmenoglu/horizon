import MainLayout from '@/layouts/MainLayout';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function SchedulePage(): React.ReactElement {
  return (
    <MainLayout>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <ExclamationTriangleIcon className="size-24 text-red-500" />
        <div className="text-2xl">
          We are working on this page. Come back later.
        </div>
      </div>
    </MainLayout>
  );
}

export default SchedulePage;
