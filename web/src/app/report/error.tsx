'use client';

import AppMessage from '@/components/blocks/app-message';

export default function Error() {
  return (
    <div className="my-32">
      <AppMessage errorMessage="Error: Invalid report type or ID" />
    </div>
  );
}
