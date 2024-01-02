import {
  BellIcon,
  CloudIcon,
  ComputerDesktopIcon,
  IdentificationIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { TNavItem } from './NavItem';
import AccountTab from './tabs/AccountTab';
import ProfileTab from './tabs/ProfileTab';
import PreferencesTab from './tabs/PreferencesTab';
import NotificationsTab from './tabs/NotificationsTab';
import PrivacyTab from './tabs/PrivacyTab';
import YourDataTab from './tabs/YourDataTab';
import HelpTab from './tabs/HelpTab';

export const tabs = [
  {
    id: 'account',
    name: 'Account',
    component: <AccountTab />,
    icon: UserIcon,
  },
  {
    id: 'profile',
    name: 'Profile',
    component: <ProfileTab />,
    icon: IdentificationIcon,
  },
  {
    id: 'preferences',
    name: 'Preferences',
    component: <PreferencesTab />,
    icon: ComputerDesktopIcon,
  },
  {
    id: 'notifications',
    name: 'Notifications',
    component: <NotificationsTab />,
    icon: BellIcon,
  },
  {
    id: 'privacy',
    name: 'Privacy',
    component: <PrivacyTab />,
    icon: LockClosedIcon,
  },
  {
    id: 'your-data',
    name: 'Your Data',
    component: <YourDataTab />,
    icon: CloudIcon,
  },
  {
    id: 'help',
    name: 'Help',
    component: <HelpTab />,
    icon: QuestionMarkCircleIcon,
  },
] as const satisfies TNavItem[];
