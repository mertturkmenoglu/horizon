'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  text: string;
  charLimit?: number;
};

export default function CollapsibleText({
  text,
  charLimit = 200,
}: Readonly<Props>) {
  const [showMore, setShowMore] = useState(false);
  const [showButton] = useState(() => text.length > charLimit);
  const shortText = useMemo(() => {
    if (text.length < charLimit) {
      return text;
    }
    return text.slice(0, charLimit) + '...';
  }, [text, charLimit]);

  const onShowMoreClick = useCallback(() => {
    setShowMore((prev) => !prev);
  }, []);

  const buttonText = useMemo(() => {
    if (showMore) {
      return 'Show less';
    }
    return 'Show more';
  }, [showMore]);

  return (
    <div>
      <p className="mt-2 text-sm text-gray-500">
        {showMore && text}
        {!showMore && shortText}
      </p>

      {showButton && (
        <Button
          variant="link"
          className="px-0"
          onClick={onShowMoreClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
