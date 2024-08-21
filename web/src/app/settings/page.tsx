import AppMessage from '@/components/blocks/app-message';

export default async function Page() {
  return (
    <div>
      <AppMessage
        emptyMessage="Settings Page"
        showBackButton={false}
      />
    </div>
  );
}
