"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Button variant="default" className="rounded-full" asChild>
      <Link href="/sign-in">Sign in</Link>
    </Button>
  );
}
