import AppMessage from '@/components/blocks/app-message';

export default async function Page() {
  return (
    <div>
      <AppMessage
        emptyMessage="Settings/Location Page"
        showBackButton={false}
      />
    </div>
  );
}
