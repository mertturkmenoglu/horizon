import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/NavigationMenu';
import { navigationMenuTriggerStyle } from '../NavigationMenu/triggerStyle';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';
import { services } from './components';
import Logo from '../Logo';
import { cn } from '@/lib/cn';
import { resources } from './resources';

function Menu(): React.ReactElement {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Get Started */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className={cn(
                      'flex h-full w-full select-none flex-col justify-end',
                      'rounded-md bg-gradient-to-t from-sky-500 to-sky-100 p-6 no-underline outline-none focus:shadow-md'
                    )}
                    href="/"
                  >
                    <Logo className="size-12 -ml-2 fill-sky-600" />
                    <div className="mb-2 mt-4 text-lg font-bold text-white">
                      Horizon
                    </div>
                    <p className="text-sm leading-tight text-white">
                      People turn their ideas into reality with Horizon.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/docs"
                title="Introduction"
              >
                Get started with Horizon and discover endless possibilities
              </ListItem>
              <ListItem
                href="/docs/services"
                title="Services"
              >
                Learn how to list your services so other users can find you.
              </ListItem>
              <ListItem
                href="/docs/business"
                title="Expand Your Business"
              >
                You can create a business account and become a highlighted
                selection.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Features */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {services.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Resources */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {resources.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Pricing */}
        <NavigationMenuItem>
          <Link to="/pricing">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
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
