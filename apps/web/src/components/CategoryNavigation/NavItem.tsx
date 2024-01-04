import { cn } from '@/lib/cn';

type Props = React.ComponentPropsWithoutRef<'li'> & {
  text: string;
};

function NavItem({ text, className, ...props }: Props): React.ReactElement {
  return (
    <li
      className={cn(
        'hover:bg-neutral-400/20 py-1 px-2 rounded list-none whitespace-nowrap',
        className
      )}
      {...props}
    >
      <a href={`/services/${encodeURIComponent(text)}`}>{text}</a>
    </li>
  );
}

export default NavItem;
