export type Item = {
  text: string;
  href: string;
};

export const items = [
  {
    text: 'General',
    href: '/settings',
  },
  {
    text: 'Account',
    href: '/settings/account',
  },
  {
    text: 'Profile',
    href: '/settings/profile',
  },
  {
    text: 'Location',
    href: '/settings/location',
  },
  {
    text: 'Preferences',
    href: '/settings/preferences',
  },
  {
    text: 'Security',
    href: '/settings/security',
  },
] as const satisfies Item[];
