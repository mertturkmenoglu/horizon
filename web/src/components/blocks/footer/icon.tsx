import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  href: string;
  icon: LucideIcon;
  alt: string;
};

export default function SocialIcon({ href, icon: Icon, alt }: Props) {
  return (
    <li>
      <Link href={href}>
        <Icon
          size={16}
          color="#666"
        />
        <span className="sr-only">{alt}</span>
      </Link>
    </li>
  );
}
