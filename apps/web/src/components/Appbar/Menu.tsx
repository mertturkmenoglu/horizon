import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import {
  ArrowLeftStartOnRectangleIcon,
  AtSymbolIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownItem } from './DropdownItem';

function Menu(): React.ReactElement {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full size-6 inline-flex items-center justify-center text-midnight bg-white outline-none"
          aria-label="Navigation options"
        >
          <UserCircleIcon className="size-6 text-midnight" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            'min-w-40 bg-white rounded-md p-2',
            'shadow shadow-sky-500/50',
            'will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade',
            'data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
          )}
          sideOffset={10}
          align="end"
        >
          <DropdownItem
            as="link"
            href="/me"
            icon={UserCircleIcon}
            text="My Account"
          />

          <DropdownItem
            as="link"
            href="/schedule"
            icon={CalendarDaysIcon}
            text="My Schedule"
          />

          <DropdownItem
            as="link"
            href="/services/categories"
            icon={MagnifyingGlassIcon}
            text="Explore Services"
          />

          <DropdownItem
            as="link"
            href="/overview"
            icon={ChartBarIcon}
            text="Overview"
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
            onClick={async () => {
              try {
                await api('/auth/logout', {
                  method: 'POST',
                });
                window.location.href = '/';
              } catch (err) {
                /* empty */
              }
            }}
            icon={ArrowLeftStartOnRectangleIcon}
            text="Logout"
          />
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Menu;
