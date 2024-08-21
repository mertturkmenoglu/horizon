'use client';

import AppMessage from '@/components/blocks/app-message';

export default function Error() {
  return (
    <div className="my-64 flex w-full flex-col items-center">
      <AppMessage errorMessage="Something went wrong" />
    </div>
  );
}
