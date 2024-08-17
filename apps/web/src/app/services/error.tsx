'use client';

import AppMessage from '@/components/blocks/app-message';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="my-32">
      <AppMessage errorMessage={error.message} />
    </div>
  );
}
