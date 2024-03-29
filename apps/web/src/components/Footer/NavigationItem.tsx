import { Link } from 'react-router-dom';

export interface NavigationItemProps {
  href: string;
  text: string;
}

function NavigationItem({ href, text }: NavigationItemProps): JSX.Element {
  return (
    <li>
      <Link
        to={href}
        className="text-sm text-neutral-600 hover:underline"
      >
        {text}
      </Link>
    </li>
  );
}

export default NavigationItem;
