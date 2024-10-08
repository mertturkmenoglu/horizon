import { getPreview } from '@/lib/image-utils';
import { useEffect, useState } from 'react';

type Props = {
  file: File;
};

export default function Preview({ file }: Readonly<Props>) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    getPreview(file).then((s) => {
      setSrc(s);
    });
  }, [file]);

  if (!src) {
    return <></>;
  }

  return (
    <div>
      <img
        src={src}
        alt={file.name}
        className="size-20 rounded object-cover"
      />
    </div>
  );
}
