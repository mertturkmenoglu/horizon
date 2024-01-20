import { validLangKeys } from '@/lib/lang';
import clsx from 'clsx';
import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NavigationItem from './NavigationItem';
import SocialIcon from './SocialIcon';

export interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps): JSX.Element {
  const { t } = useTranslation('common', { keyPrefix: 'footer' });
  return (
    <footer
      className={clsx('container flex flex-col items-center py-8', className)}
    >
      <div className="flex space-x-2">
        {validLangKeys.map((key) => (
          <button
            key={key}
            className="text-sm text-neutral-600 hover:underline"
            onClick={() => {
              localStorage.setItem('lang', key);
              window.location.reload();
            }}
          >
            {t(`lang.${key}`)}
          </button>
        ))}
      </div>

      <nav
        aria-label={t('description')}
        className="mt-4"
      >
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
            href="/help#faq"
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
