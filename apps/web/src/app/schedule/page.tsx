import AppMessage from '@/components/blocks/app-message';

export default async function Page() {
  return (
    <div>
      <AppMessage
        className="my-16"
        emptyMessage="Schedule Page"
        showBackButton={false}
      />
    </div>
  );
}
