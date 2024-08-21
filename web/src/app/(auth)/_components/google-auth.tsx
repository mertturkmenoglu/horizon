import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/ui/google-icon';

type Props = {
  text: string;
};

export default function GoogleAuth({ text }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_API ?? '';

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        window.location.href = baseUrl + '/auth/google';
      }}
      type="button"
    >
      <GoogleIcon className="mr-2 size-5" />
      {text}
    </Button>
  );
}
