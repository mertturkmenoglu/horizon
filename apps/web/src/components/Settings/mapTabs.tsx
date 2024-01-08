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
import AccountTab from './tabs/AccountTab';
import ProfileTab from './tabs/ProfileTab';
import PreferencesTab from './tabs/PreferencesTab';
import NotificationsTab from './tabs/NotificationsTab';
import PrivacyTab from './tabs/PrivacyTab';
import YourDataTab from './tabs/YourDataTab';
import HelpTab from './tabs/HelpTab';
import AuthActivities from './tabs/AuthActivitiesTab';
import LocationTab from './tabs/LocationTab';
import i18n from '@/i18n';
import { en, tr } from './translations';

i18n.addResourceBundle('en', 'settings-tabs', en, true, false);
i18n.addResourceBundle('tr', 'settings-tabs', tr, true, false);

export const tabs = [
  {
    id: 'account',
    name: i18n.t('settings-tabs:tabs.account'),
    component: <AccountTab />,
    icon: UserIcon,
  },
  {
    id: 'profile',
    name: i18n.t('settings-tabs:tabs.profile'),
    component: <ProfileTab />,
    icon: IdentificationIcon,
  },
  {
    id: 'location',
    name: i18n.t('settings-tabs:tabs.location'),
    component: <LocationTab />,
    icon: MapPinIcon,
  },
  {
    id: 'preferences',
    name: i18n.t('settings-tabs:tabs.preferences'),
    component: <PreferencesTab />,
    icon: ComputerDesktopIcon,
  },
  {
    id: 'notifications',
    name: i18n.t('settings-tabs:tabs.notifications'),
    component: <NotificationsTab />,
    icon: BellIcon,
  },
  {
    id: 'privacy',
    name: i18n.t('settings-tabs:tabs.privacy'),
    component: <PrivacyTab />,
    icon: LockClosedIcon,
  },
  {
    id: 'your-data',
    name: i18n.t('settings-tabs:tabs.your-data'),
    component: <YourDataTab />,
    icon: CloudIcon,
  },
  {
    id: 'auth-activity',
    name: i18n.t('settings-tabs:tabs.auth-activity'),
    component: <AuthActivities />,
    icon: ShieldCheckIcon,
  },
  {
    id: 'help',
    name: i18n.t('settings-tabs:tabs.help'),
    component: <HelpTab />,
    icon: QuestionMarkCircleIcon,
  },
] as const satisfies TNavItem[];
