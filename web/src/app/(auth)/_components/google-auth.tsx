import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/ui/google-icon';
import { useCallback } from 'react';

type Props = {
  text: string;
};

export default function GoogleAuth({ text }: Readonly<Props>) {
  const baseUrl = process.env.NEXT_PUBLIC_API ?? '';

  const onClick = useCallback(() => {
    window.location.href = baseUrl + '/auth/google';
  }, [baseUrl]);

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={onClick}
      type="button"
    >
      <GoogleIcon className="mr-2 size-5" />
      {text}
    </Button>
  );
}
