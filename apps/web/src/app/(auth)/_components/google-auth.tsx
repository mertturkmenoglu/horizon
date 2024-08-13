import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/ui/google-icon';

type Props = {
  text: string;
};

export default function GoogleAuth({ text }: Props) {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        window.location.href = 'http://localhost:5000/api/auth/google';
      }}
    >
      <GoogleIcon className="mr-2 size-5" />
      {text}
    </Button>
  );
}
