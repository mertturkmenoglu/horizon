import AppMessage from '@/components/blocks/app-message';

export default async function Page() {
  return (
    <div className="container">
      <AppMessage
        className="my-16"
        emptyMessage="Notifications Page"
        showBackButton={false}
      />
    </div>
  );
}
