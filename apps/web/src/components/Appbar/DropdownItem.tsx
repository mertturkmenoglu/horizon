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

export function DropdownItem(props: DropdownItemProps): React.ReactElement {
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
