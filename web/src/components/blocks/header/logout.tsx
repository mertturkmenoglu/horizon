'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import api from '@/lib/api';

export default function Logout(): React.ReactElement {
  const logout = async () => {
    await api.post('auth/logout');
    window.location.reload();
  };

  return (
    <DropdownMenuItem
      className="hover:cursor-pointer"
      onClick={async (e) => {
        e.preventDefault();
        await logout();
      }}
    >
      Log out
    </DropdownMenuItem>
  );
}
