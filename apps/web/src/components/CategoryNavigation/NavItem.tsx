import { cn } from '@/lib/cn';
import { Link } from 'react-router-dom';

type Props = React.ComponentPropsWithoutRef<'li'> & {
  text: string;
};

function NavItem({ text, className, ...props }: Props): React.ReactElement {
  return (
    <li
      className={cn(
        'list-none whitespace-nowrap rounded px-2 py-1 hover:bg-neutral-400/20',
        className
      )}
      {...props}
    >
      <Link to={`/services/${encodeURIComponent(text)}`}>{text}</Link>
    </li>
  );
}

export default NavItem;
