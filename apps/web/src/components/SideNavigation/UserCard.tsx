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
import { getUserImage } from '@/lib/img';

export type UserCardProps = React.ComponentPropsWithoutRef<'div'> & {
  collapsed?: boolean;
};

const UserCard = React.forwardRef<React.ElementRef<'div'>, UserCardProps>(
  ({ className, collapsed = false }, ref) => {
    const { user } = useAuth();
    const image = useMemo(() => {
      return getUserImage(user?.profileImage);
    }, [user]);

    if (!user) {
      return <></>;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between border-t border-t-midnight/20 py-4',
          className
        )}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={cn(
                'flex items-center',
                'w-full hover:bg-neutral-400/20',
                'focus:outline-none focus:ring focus:ring-sky-500',
                {
                  'space-x-4 rounded-lg py-1': !collapsed,
                  'rounded-full': collapsed,
                }
              )}
            >
              <img
                src={image}
                className="size-12 rounded-full"
                alt=""
              />
              {!collapsed && (
                <div className="flex flex-col items-start overflow-x-hidden text-left">
                  <div className="line-clamp-1 font-bold">{user.name}</div>
                  <div className="line-clamp-1 text-sm text-neutral-500">
                    @{user.username}
                  </div>
                </div>
              )}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={cn(
                'w-full min-w-52 rounded-md bg-white p-2',
                'border border-midnight/20',
                'will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade',
                'data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade'
              )}
              sideOffset={20}
              align={collapsed ? 'start' : 'center'}
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

              <DropdownMenu.Separator className="my-2 h-[1px] bg-sky-500" />

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

              <DropdownMenu.Separator className="my-2 h-[1px] bg-sky-500" />

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
