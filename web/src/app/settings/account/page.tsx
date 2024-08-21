import AppMessage from '@/components/blocks/app-message';

export default async function Page() {
  return (
    <div>
      <AppMessage
        emptyMessage="Settings/Account Page"
        showBackButton={false}
      />
    </div>
  );
}
