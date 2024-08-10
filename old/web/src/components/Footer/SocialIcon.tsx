import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  alt: string;
}

function SocialIcon({ href, icon: Icon, alt }: SocialIconProps): JSX.Element {
  return (
    <li>
      <Link to={href}>
        <Icon
          size={16}
          color="#666"
        />
        <span className="sr-only">{alt}</span>
      </Link>
    </li>
  );
}

export default SocialIcon;
