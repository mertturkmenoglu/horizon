import { cookies } from 'next/headers';
import { cache } from 'react';
import api from './api';
import { GetMeResponseDto } from './dto';

export type Auth = {
  data: GetMeResponseDto;
};

const cookieName = '__horizon_auth';

export const getAuth = cache(async (): Promise<Auth | null> => {
  const sessionCookie = cookies().get(cookieName);

  if (!sessionCookie) {
    return null;
  }

  try {
    const res = await api.get('auth/me', {
      credentials: 'include',
      headers: {
        Cookie: `${cookieName}=${sessionCookie.value}`,
      },
    });

    if (res.status !== 200) {
      return null;
    }

    const body = await res.json<Auth>();
    return body;
  } catch (e) {
    return null;
  }
});

export function getAuthCookie() {
  const v = cookies().get(cookieName)?.value ?? '';
  return {
    Cookie: `${cookieName}=${v}`,
  };
}
