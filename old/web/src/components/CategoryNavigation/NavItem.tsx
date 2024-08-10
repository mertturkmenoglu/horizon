import { cn } from '@/lib/cn';
import { Link } from 'react-router-dom';

type Props = Omit<React.ComponentPropsWithoutRef<'li'>, 'id'> & {
  text: string;
  id: number;
};

function NavItem({ text, className, id, ...props }: Props): React.ReactElement {
  return (
    <li
      className={cn(
        'list-none whitespace-nowrap rounded px-2 py-1 hover:bg-neutral-400/20',
        className
      )}
      {...props}
    >
      <Link to={`/categories/${encodeURIComponent(text)}?id=${id}`}>
        {text}
      </Link>
    </li>
  );
}

export default NavItem;
