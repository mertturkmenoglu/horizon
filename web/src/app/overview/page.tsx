import AppMessage from '@/components/blocks/app-message';

export default async function Page() {
  return (
    <div>
      <AppMessage
        className="my-16"
        emptyMessage="Overview Page"
        showBackButton={false}
      />
    </div>
  );
}
