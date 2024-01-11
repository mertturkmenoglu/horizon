import MainLayout from '@/layouts/MainLayout';
import NewServiceForm from '@/components/NewServiceForm';

function NewServicePage(): React.ReactElement {
  return (
    <MainLayout>
      <NewServiceForm className="mt-8 max-w-2xl" />
    </MainLayout>
  );
}

export default NewServicePage;
