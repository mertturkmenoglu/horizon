import { cn } from '@/lib/cn';
import {
  ArrowLeftStartOnRectangleIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type AsButton = {
  as: 'button';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

type AsLink = {
  as: 'link';
  href: string;
};

type Base = {
  icon: TwIcon;
  text: string;
};

type TwIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;

type DropdownItemProps = (Base & AsLink) | (Base & AsButton);

function isLink(props: DropdownItemProps): props is Base & AsLink {
  return props.as === 'link' && !!props.href;
}

function DropdownItem(props: DropdownItemProps): React.ReactElement {
  const children = isLink(props) ? (
    <a
      href={props.href}
      className="flex items-center space-x-2"
    >
      <props.icon className="size-6" />
      <span>{props.text}</span>
    </a>
  ) : (
    <>
      <props.icon className="size-6" />
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );

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
            href="/explore"
            icon={BuildingStorefrontIcon}
            text="Explore"
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

          <DropdownMenu.Separator className="h-[1px] bg-sky-500 my-2" />

          <DropdownItem
            as="button"
            onClick={() => {}}
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
