import AppMessage from '@/components/blocks/app-message';

export default async function Page() {
  return (
    <div>
      <AppMessage
        emptyMessage="Settings/Profile Page"
        showBackButton={false}
      />
    </div>
  );
}