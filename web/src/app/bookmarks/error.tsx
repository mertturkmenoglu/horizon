'use client';

import AppMessage from '@/components/blocks/app-message';

export default function Error() {
  return (
    <div className="my-32">
      <AppMessage errorMessage="Something went wrong" />
    </div>
  );
}
