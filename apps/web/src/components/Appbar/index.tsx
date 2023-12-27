import { cn } from '@/lib/cn';
import Logo from '../Logo';
import {
  UserCircleIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface AppbarProps {
  className?: string;
}

function DropdownItem({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <DropdownMenu.Item
      className={cn(
        'group text-sm leading-none text-black',
        'rounded flex items-center px-2 relative mt-2 py-1',
        'select-none outline-none data-[disabled]:text-neutral-400 data-[disabled]:pointer-events-none data-[highlighted]:bg-sky-500 data-[highlighted]:text-sky-100'
      )}
    >
      {children}
    </DropdownMenu.Item>
  );
}

function Appbar({ className }: AppbarProps): React.ReactElement {
  return (
    <div
      className={cn(
        ' border-b-2 border-sky-500 flex justify-between items-center py-2 px-4',
        className
      )}
    >
      <div className="flex items-end">
        <Logo className="size-8 fill-sky-500" />
        <span className="text-sky-500 -skew-x-6">orizon</span>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-full size-8 inline-flex items-center justify-center text-sky-500 bg-white outline-none"
            aria-label="Navigation options"
          >
            <UserCircleIcon className="size-8 text-sky-500" />
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
          >
            <DropdownItem>
              <a
                href="/me"
                className="flex items-center space-x-2"
              >
                <UserCircleIcon className="size-6" />
                <span>My Account</span>
              </a>
            </DropdownItem>

            <DropdownItem>
              <a
                href="/explore"
                className="flex items-center space-x-2"
              >
                <BuildingStorefrontIcon className="size-6" />
                <span>Explore</span>
              </a>
            </DropdownItem>

            <DropdownItem>
              <a
                href="/overview"
                className="flex items-center space-x-2"
              >
                <ChartBarIcon className="size-6" />
                <span>Overview</span>
              </a>
            </DropdownItem>

            <DropdownItem>
              <a
                href="/settings"
                className="flex items-center space-x-2"
              >
                <Cog6ToothIcon className="size-6" />
                <span>Settings</span>
              </a>
            </DropdownItem>

            <DropdownMenu.Separator className="h-[1px] bg-sky-500 my-2" />

            <DropdownItem>
              <ArrowLeftStartOnRectangleIcon className="size-6" />
              <button>Logout</button>
            </DropdownItem>

            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export default Appbar;
