import MainLayout from '@/layouts/MainLayout';
import SettingsLayout from '@/layouts/SettingsLayout';
import { cn } from '@/lib/cn';
import {
  BellIcon,
  CloudIcon,
  ComputerDesktopIcon,
  IdentificationIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';

type TNavItem = {
  id: string;
  name: string;
  component: React.ReactElement;
  icon: TwIcon;
};

const tabs = [
  {
    id: 'account',
    name: 'Account',
    component: <>Account</>,
    icon: UserIcon,
  },
  {
    id: 'profile',
    name: 'Profile',
    component: <>Profile</>,
    icon: IdentificationIcon,
  },
  {
    id: 'preferences',
    name: 'Preferences',
    component: <>Preferences</>,
    icon: ComputerDesktopIcon,
  },
  {
    id: 'notifications',
    name: 'Notifications',
    component: <>Notifications</>,
    icon: BellIcon,
  },
  {
    id: 'privacy',
    name: 'Privacy',
    component: <>Privacy</>,
    icon: LockClosedIcon,
  },
  {
    id: 'your-data',
    name: 'Your Data',
    component: <>Your Data</>,
    icon: CloudIcon,
  },
  {
    id: 'help',
    name: 'Help',
    component: <>Help</>,
    icon: QuestionMarkCircleIcon,
  },
] as const satisfies TNavItem[];

function NavItem({ id, name, icon: Icon }: TNavItem): React.ReactElement {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'account';
  const isCurrentTab = tab === id;
  return (
    <li className="w-full">
      <a
        href={`/settings?tab=${id}`}
        className={cn(
          'flex space-x-2 items-center text- py-1 px-4 rounded-md mx-2',
          'transition-all ease-out duration-100',
          'hover:bg-sky-600/90 hover:text-white focus:bg-sky-600/90 focus:text-white',
          'font-semibold text-sm',
          'focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 focus:outline-none',
          {
            'bg-sky-600 text-white': isCurrentTab,
          }
        )}
      >
        <Icon
          className={cn('size-5', {
            'text-white': isCurrentTab,
          })}
        />
        <span>{name}</span>
      </a>
    </li>
  );
}

function Tabs(): React.ReactElement {
  return (
    <nav className="w-full">
      <ul className="flex flex-col space-y-1 w-full">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            {...tab}
          />
        ))}
      </ul>
    </nav>
  );
}

function SettingsPage(): React.ReactElement {
  return (
    <MainLayout>
      <SettingsLayout tabs={<Tabs />}>
        <div>Page</div>
      </SettingsLayout>
    </MainLayout>
  );
}

export default SettingsPage;
