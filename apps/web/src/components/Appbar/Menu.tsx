import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import {
  ArrowLeftStartOnRectangleIcon,
  AtSymbolIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownItem } from '../NavDropdownItem';
import { useAuth } from '@/hooks/useAuth';
import { getUserImage } from '@/lib/img';
import { useTranslation } from 'react-i18next';

function Menu(): React.ReactElement {
  const { user } = useAuth();
  const { t } = useTranslation('appbar', { keyPrefix: 'menu' });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full size-10 inline-flex items-center justify-center text-midnight bg-white outline-none"
          aria-label="Navigation options"
        >
          <img
            src={getUserImage(user?.profileImage)}
            className="size-10 rounded-full"
            alt={t('alt')}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            'min-w-56 bg-white rounded-md p-2',
            'border border-midnight/10',
            'will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade',
            'data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade',
            'data-[side=left]:animate-slideRightAndFade'
          )}
          sideOffset={10}
          align="end"
        >
          <DropdownItem
            as="link"
            href="/me"
            icon={UserCircleIcon}
            text={t('my-account')}
          />

          <DropdownItem
            as="link"
            href="/schedule"
            icon={CalendarDaysIcon}
            text={t('my-schedule')}
          />

          <DropdownItem
            as="link"
            href="/services/categories"
            icon={MagnifyingGlassIcon}
            text={t('explore-services')}
          />

          <DropdownItem
            as="link"
            href="/overview"
            icon={ChartBarIcon}
            text={t('overview')}
          />

          <DropdownItem
            as="link"
            href="/settings"
            icon={Cog6ToothIcon}
            text={t('settings')}
          />

          <DropdownMenu.Separator className="h-[1px] bg-midnight my-2" />

          <DropdownItem
            as="link"
            href="/help"
            icon={QuestionMarkCircleIcon}
            text={t('help')}
          />

          <DropdownItem
            as="link"
            href="/terms"
            icon={ScaleIcon}
            text={t('tos')}
          />

          <DropdownItem
            as="link"
            href="/privacy"
            icon={LockClosedIcon}
            text={t('privacy')}
          />

          <DropdownItem
            as="link"
            href="/contact"
            icon={AtSymbolIcon}
            text={t('contact-us')}
          />

          <DropdownMenu.Separator className="h-[1px] bg-midnight my-2" />

          <DropdownItem
            as="button"
            onClick={async () => {
              try {
                await api('/auth/logout', {
                  method: 'POST',
                });
                window.location.href = '/';
              } catch (err) {
                /* empty */
              }
            }}
            icon={ArrowLeftStartOnRectangleIcon}
            text={t('logout')}
          />
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Menu;
