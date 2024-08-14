'use client';

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Logout from './logout';

type Props = {
  fullName: string;
  username: string;
};

export default function MenuContent({ fullName, username }: Props) {
  return (
    <DropdownMenuContent
      className="w-56"
      align="end"
    >
      <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
        >
          <Link href={`/user/${username}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
        >
          <Link href="/notifications">Notifications</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
        >
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            href={`/schedule`}
            className="cursor-pointer"
          >
            Schedule
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
        >
          <Link href="/overview">Overview</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
        >
          <Link href="/services">My Services</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled>Help</DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="cursor-pointer"
      >
        <Link href="/privacy">Privacy</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="cursor-pointer"
      >
        <Link href="/terms">Terms</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="cursor-pointer"
      >
        <Link href="/contact">Contact Us</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <Logout />
    </DropdownMenuContent>
  );
}