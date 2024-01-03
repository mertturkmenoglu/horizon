import MainLayout from '@/layouts/MainLayout';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function MessagesPage(): React.ReactElement {
  return (
    <MainLayout>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <ExclamationTriangleIcon className="size-24 text-red-500" />
        <div className="text-2xl">
          We are working on this page. Come back later.
        </div>
      </div>
    </MainLayout>
  );
}

export default MessagesPage;
