import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className="container my-32">
      <Button
        variant="link"
        asChild
      >
        <Link href="/blog/changelog">See the changelog</Link>
      </Button>
    </div>
  );
}
