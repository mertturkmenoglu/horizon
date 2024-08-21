'use client';

import AppMessage from '@/components/blocks/app-message';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <AppMessage
          errorMessage={error.message}
          className="my-32"
        />
      </body>
    </html>
  );
}
