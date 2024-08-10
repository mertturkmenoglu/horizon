import NewServiceForm from '@/components/NewServiceForm';
import MainLayout from '@/layouts/MainLayout';

function NewServicePage(): React.ReactElement {
  return (
    <MainLayout>
      <NewServiceForm className="mt-8 max-w-2xl" />
    </MainLayout>
  );
}

export default NewServicePage;
