import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';
import React, { useMemo } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownItem } from '../NavDropdownItem';
import {
  ArrowLeftStartOnRectangleIcon,
  AtSymbolIcon,
  Cog6ToothIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { logout } from '@/lib/logout';

export type UserCardProps = React.ComponentPropsWithoutRef<'div'>;

const UserCard = React.forwardRef<React.ElementRef<'div'>, UserCardProps>(
  ({ className }, ref) => {
    const { user } = useAuth();
    const image = useMemo(() => {
      if (!user) return '/user.jpg';
      return user.profileImage === '' ? '/user.jpg' : user.profileImage;
    }, [user]);

    if (!user) {
      return <></>;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'border-t border-t-midnight/20 py-4 flex items-center justify-between',
          className
        )}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={cn(
                'flex space-x-4 items-center',
                'hover:bg-neutral-400/20 pr-4 rounded-lg py-1 w-full',
                'focus:outline-none focus:ring focus:ring-sky-500'
              )}
            >
              <img
                src={image}
                className="size-12 rounded-full"
                alt=""
              />
              <div className="flex flex-col items-start text-left overflow-x-hidden">
                <div className="font-bold line-clamp-1">{user.name}</div>
                <div className="text-neutral-500 text-sm line-clamp-1">
                  @{user.username}
                </div>
              </div>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={cn(
                'min-w-52 w-full bg-white rounded-md p-2',
                'border border-midnight/20',
                'will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade',
                'data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
              )}
              sideOffset={20}
              align="center"
            >
              <DropdownItem
                as="link"
                href="/me"
                icon={UserCircleIcon}
                text="My Account"
              />

              <DropdownItem
                as="link"
                href="/settings"
                icon={Cog6ToothIcon}
                text="Settings"
              />

              <DropdownMenu.Separator className="h-[1px] bg-sky-500 my-2" />

              <DropdownItem
                as="link"
                href="/help"
                icon={QuestionMarkCircleIcon}
                text="Help"
              />

              <DropdownItem
                as="link"
                href="/terms"
                icon={ScaleIcon}
                text="Terms of Service"
              />

              <DropdownItem
                as="link"
                href="/privacy"
                icon={LockClosedIcon}
                text="Privacy"
              />

              <DropdownItem
                as="link"
                href="/contact"
                icon={AtSymbolIcon}
                text="Contact Us"
              />

              <DropdownMenu.Separator className="h-[1px] bg-sky-500 my-2" />

              <DropdownItem
                as="button"
                onClick={logout}
                icon={ArrowLeftStartOnRectangleIcon}
                text="Logout"
              />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    );
  }
);

UserCard.displayName = 'UserCard';

export default UserCard;
