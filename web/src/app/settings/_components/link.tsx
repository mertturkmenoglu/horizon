'use client';

import { cn } from '@/lib/utils';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Item } from './items';

type Props = Item;

export default function Link({ text, href }: Props) {
  const pathname = usePathname();

  return (
    <NextLink
      href={href}
      className={cn({
        'font-semibold text-primary': pathname === href,
      })}
    >
      {text}
    </NextLink>
  );
}
