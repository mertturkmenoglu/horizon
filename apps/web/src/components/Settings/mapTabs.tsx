import {
  BellIcon,
  CloudIcon,
  ComputerDesktopIcon,
  IdentificationIcon,
  LockClosedIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { TNavItem } from './NavItem';
import AccountTab from '../../pages/Settings/Account/index';
import AuthActivities from './tabs/AuthActivitiesTab';
import HelpTab from './tabs/HelpTab';
import LocationTab from './tabs/LocationTab';
import NotificationsTab from './tabs/NotificationsTab';
import PreferencesTab from './tabs/PreferencesTab';
import PrivacyTab from './tabs/PrivacyTab';
import ProfileTab from './tabs/ProfileTab';
import YourDataTab from './tabs/YourDataTab';

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
    id: 'notifications',
    name: 'tabs.notifications',
    component: <NotificationsTab />,
    icon: BellIcon,
  },
  {
    id: 'privacy',
    name: 'tabs.privacy',
    component: <PrivacyTab />,
    icon: LockClosedIcon,
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
    component: <HelpTab />,
    icon: QuestionMarkCircleIcon,
  },
] as const satisfies TNavItem[];
