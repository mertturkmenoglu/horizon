import { cn } from '@/lib/utils';
import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import SocialIcon from './icon';
import Item from './item';

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <footer
      className={cn('container flex flex-col items-center py-8', className)}
    >
      <nav
        aria-label="Website footer"
        className=""
      >
        <ul className="flex gap-x-8">
          <Item
            href="/about"
            text="About"
          />

          <Item
            href="/blog"
            text="Blog"
          />

          <Item
            href="/help"
            text="Help"
          />

          <Item
            href="/contact"
            text="Contact"
          />

          <Item
            href="/privacy"
            text="Privacy"
          />
        </ul>
      </nav>

      <div className="mt-8">
        <ul className="flex space-x-6">
          <SocialIcon
            href="#"
            alt="Facebook"
            icon={Facebook}
          />

          <SocialIcon
            href="#"
            alt="Twitter"
            icon={Twitter}
          />

          <SocialIcon
            href="#"
            alt="LinkedIn"
            icon={Linkedin}
          />

          <SocialIcon
            href="#"
            alt="GitHub"
            icon={Github}
          />
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-xs lining-nums text-neutral-600">
          &copy; {new Date().getFullYear()} Horizon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
