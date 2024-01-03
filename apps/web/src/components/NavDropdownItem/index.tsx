import { cn } from '@/lib/cn';
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

type DropdownItemProps = (Base & AsLink) | (Base & AsButton);

function isLink(props: DropdownItemProps): props is Base & AsLink {
  return props.as === 'link' && !!props.href;
}

const itemStyles = cn(
  'group text-sm leading-none text-black',
  'rounded flex items-center px-2 relative mt-2 py-1',
  'select-none outline-none',
  'data-[disabled]:text-neutral-400 data-[disabled]:pointer-events-none',
  'data-[highlighted]:bg-sky-500 data-[highlighted]:text-sky-100'
);

export function DropdownItem(props: DropdownItemProps): React.ReactElement {
  const component = (
    <DropdownMenu.Item className={itemStyles}>
      <div className="flex items-center space-x-2 w-full">
        <props.icon className="size-6" />
        <span>{props.text}</span>
      </div>
    </DropdownMenu.Item>
  );

  if (isLink(props)) {
    return <a href={props.href}>{component}</a>;
  }

  return (
    <button
      onClick={props.onClick}
      className="w-full"
    >
      {component}
    </button>
  );
}
