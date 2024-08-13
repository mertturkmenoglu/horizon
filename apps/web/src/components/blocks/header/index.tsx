import Logo from "@/app/logo.png";
import { getAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import SignInButton from "./sign-in-button";

type Props = React.HTMLAttributes<HTMLElement>;

export default async function Header({ className, ...props }: Props) {
  const auth = await getAuth();
  const isSignedIn = auth !== null;

  return (
    <header
      className={cn(
        "container flex items-center justify-between mt-8",
        className
      )}
      {...props}
    >
      <Link href="/" className="flex items-center gap-4">
        <Image src={Logo} alt="Horizon" className="size-12 min-h-12 min-w-12" />

        <div className="text-xl">Horizon</div>
      </Link>

      {!isSignedIn && <SignInButton />}

      {isSignedIn && <Menu auth={auth} />}
    </header>
  );
}
