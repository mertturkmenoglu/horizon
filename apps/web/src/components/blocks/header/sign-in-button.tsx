'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignInButton() {
  return (
    <Button
      variant="default"
      className=""
      asChild
    >
      <div className="flex items-center gap-2">
        <Link href="/sign-in">Sign in</Link>
        <ArrowRight className="size-4" />
      </div>
    </Button>
  );
}
