import { api } from '@/lib/api';
import { GetMeResponse } from '@/lib/dto';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState<GetMeResponse | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await api<{ data: GetMeResponse }>('/users/me');
      setUser(res.data);
    };

    fetchMe()
      .catch(() => setUser(null))
      .finally(() => setChecked(true));
  }, [setUser, setChecked]);

  return {
    isAuthenticated: user !== null,
    loading: !checked,
  };
}
