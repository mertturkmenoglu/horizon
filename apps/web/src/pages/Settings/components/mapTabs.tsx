import {
  CloudIcon,
  ComputerDesktopIcon,
  IdentificationIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { TNavItem } from './NavItem';
import AccountTab from '../Account';
import AuthActivities from '../AuthActivities';
import LocationTab from '../Location';
import PreferencesTab from '../Preferences';
import ProfileTab from '../Profile';
import YourDataTab from '../YourData';

export const tabs = [
  {
    id: 'account',
    name: 'tabs.account',
    component: <AccountTab />,
    icon: UserIcon,
  },
  {
    id: 'profile',
    name: 'tabs.profile',
    component: <ProfileTab />,
    icon: IdentificationIcon,
  },
  {
    id: 'location',
    name: 'tabs.location',
    component: <LocationTab />,
    icon: MapPinIcon,
  },
  {
    id: 'preferences',
    name: 'tabs.preferences',
    component: <PreferencesTab />,
    icon: ComputerDesktopIcon,
  },
  {
    id: 'your-data',
    name: 'tabs.your-data',
    component: <YourDataTab />,
    icon: CloudIcon,
  },
  {
    id: 'auth-activity',
    name: 'tabs.auth-activity',
    component: <AuthActivities />,
    icon: ShieldCheckIcon,
  },
  {
    id: 'help',
    name: 'tabs.help',
    component: <></>,
    icon: QuestionMarkCircleIcon,
  },
] as const satisfies TNavItem[];
