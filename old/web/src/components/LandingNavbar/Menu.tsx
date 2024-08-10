import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/NavigationMenu';
import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { navigationMenuTriggerStyle } from '../NavigationMenu/triggerStyle';
import ListItem from './ListItem';

function Menu(): React.ReactElement {
  const { t } = useTranslation('landing', { keyPrefix: 'menu' });
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Get Started */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('getting-started')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      'flex h-full w-full select-none flex-col justify-end',
                      'rounded-md bg-gradient-to-t from-sky-500 to-sky-100 p-6 no-underline outline-none focus:shadow-md'
                    )}
                    to="/"
                  >
                    <Logo className="-ml-2 size-12 fill-sky-600" />
                    <div className="mb-2 mt-4 text-lg font-bold text-white">
                      Horizon
                    </div>
                    <p className="text-sm leading-tight text-white">
                      {t('slogan')}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {[0, 1, 2].map((index) => (
                <ListItem
                  key={t(`menu1.${index}.href`)}
                  href={t(`menu1.${index}.href`)}
                  title={t(`menu1.${index}.title`)}
                >
                  {t(`menu1.${index}.text`)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Features */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('features')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <ListItem
                  key={t(`services.${i}.href`)}
                  title={t(`services.${i}.title`)}
                  href={t(`services.${i}.href`)}
                >
                  {t(`services.${i}.description`)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Resources */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('resources-title')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <ListItem
                  key={t(`resources.${i}.href`)}
                  title={t(`resources.${i}.title`)}
                  href={t(`resources.${i}.href`)}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Pricing */}
        <NavigationMenuItem>
          <Link to="/pricing">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t('pricing')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* GitHub */}
        <NavigationMenuItem>
          <Link to="https://github.com/mertturkmenoglu/horizon">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              GitHub
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Menu;
