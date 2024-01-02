import { useAuth } from '@/hooks/useAuth';
import { GetUserByUsernameResponse } from '@/lib/dto';
import { useMemo } from 'react';

export function useUserInfo(user: GetUserByUsernameResponse) {
  const { user: authUser } = useAuth();
  const image = useMemo(() => {
    return user.profileImage !== '' ? user.profileImage : '/user.jpg';
  }, [user.profileImage]);

  const description = useMemo(() => {
    return user.description !== '' ? user.description : 'No description';
  }, [user.description]);

  const location = useMemo(() => {
    if (user.location.city === '' || user.location.city === '') {
      return '';
    }

    return `${user.location.city}, ${user.location.country}`;
  }, [user.location]);

  const isThisUser = useMemo(() => {
    return user.id === authUser?.id;
  }, [user, authUser]);

  return {
    image,
    description,
    location,
    isThisUser,
  };
}
