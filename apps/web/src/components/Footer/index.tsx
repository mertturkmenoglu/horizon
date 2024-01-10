import clsx from 'clsx';
import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import NavigationItem from './NavigationItem';
import SocialIcon from './SocialIcon';
import { useTranslation } from 'react-i18next';

export interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps): JSX.Element {
  const { t } = useTranslation('common', { keyPrefix: 'footer' });
  return (
    <footer
      className={clsx('container flex flex-col items-center py-8', className)}
    >
      <nav>
        <ul className="flex space-x-8">
          <NavigationItem
            href="/about"
            text={t('about')}
          />

          <NavigationItem
            href="/blog"
            text={t('blog')}
          />

          <NavigationItem
            href="/faq"
            text={t('faq')}
          />
          <NavigationItem
            href="/contact"
            text={t('contact')}
          />

          <NavigationItem
            href="/privacy"
            text={t('privacy')}
          />
        </ul>
      </nav>

      <div className="mt-8">
        <ul className="flex space-x-6">
          <SocialIcon
            href="#"
            alt={t('facebook')}
            icon={Facebook}
          />

          <SocialIcon
            href="#"
            alt={t('twitter')}
            icon={Twitter}
          />

          <SocialIcon
            href="#"
            alt={t('linkedin')}
            icon={Linkedin}
          />

          <SocialIcon
            href="#"
            alt={t('github')}
            icon={Github}
          />
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-xs lining-nums text-neutral-600">
          &copy; {new Date().getFullYear()} Horizon. {t('copy')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
