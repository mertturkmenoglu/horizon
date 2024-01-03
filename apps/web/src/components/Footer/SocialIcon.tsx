import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface SocialIconProps {
  href: string;
  icon: LucideIcon;
}

function SocialIcon({ href, icon: Icon }: SocialIconProps): JSX.Element {
  return (
    <li>
      <Link to={href}>
        <Icon
          size={16}
          color="#666"
        />
      </Link>
    </li>
  );
}

export default SocialIcon;
