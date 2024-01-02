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
import AccountTab from './AccountTab';

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
